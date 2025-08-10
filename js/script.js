// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
  
  // Sélectionner tous les éléments nécessaires
  const plusButtons = document.querySelectorAll('.fa-plus-circle');
  const minusButtons = document.querySelectorAll('.fa-minus-circle');
  const deleteButtons = document.querySelectorAll('.fa-trash-alt');
  const heartButtons = document.querySelectorAll('.fa-heart');
  const totalPriceElement = document.querySelector('.total');
  
  // Fonction pour extraire le prix unitaire d'un produit
  function getUnitPrice(productCard) {
    const priceText = productCard.querySelector('.unit-price').textContent;
    return parseInt(priceText.replace('$', '').trim());
  }
  
  // Fonction pour mettre à jour le prix total
  function updateTotalPrice() {
    let total = 0;
    const productCards = document.querySelectorAll('.card-container');
    
    productCards.forEach(container => {
      // Vérifier si le produit n'est pas masqué (supprimé)
      if (!container.style.display || container.style.display !== 'none') {
        const card = container.querySelector('.card-body');
        const quantity = parseInt(card.querySelector('.quantity').textContent);
        const unitPrice = getUnitPrice(card);
        total += quantity * unitPrice;
      }
    });
    
    totalPriceElement.textContent = total + ' $';
    
    // Animation du prix total
    totalPriceElement.parentElement.style.transform = 'scale(1.05)';
    setTimeout(() => {
      totalPriceElement.parentElement.style.transform = 'scale(1)';
    }, 200);
  }
  
  // Fonction pour gérer l'incrémentation de la quantité
  function incrementQuantity(button) {
    const quantitySpan = button.nextElementSibling;
    let currentQuantity = parseInt(quantitySpan.textContent);
    currentQuantity++;
    quantitySpan.textContent = currentQuantity;
    
    // Animation de la quantité
    quantitySpan.style.transform = 'scale(1.2)';
    quantitySpan.style.color = '#28a745';
    setTimeout(() => {
      quantitySpan.style.transform = 'scale(1)';
      quantitySpan.style.color = '#333';
    }, 300);
    
    updateTotalPrice();
  }
  
  // Fonction pour gérer la décrémentation de la quantité
  function decrementQuantity(button) {
    const quantitySpan = button.previousElementSibling;
    let currentQuantity = parseInt(quantitySpan.textContent);
    if (currentQuantity > 0) {
      currentQuantity--;
      quantitySpan.textContent = currentQuantity;
      
      // Animation de la quantité
      quantitySpan.style.transform = 'scale(1.2)';
      quantitySpan.style.color = '#ffc107';
      setTimeout(() => {
        quantitySpan.style.transform = 'scale(1)';
        quantitySpan.style.color = '#333';
      }, 300);
      
      updateTotalPrice();
    }
  }
  
  // Fonction pour supprimer un produit
  function deleteProduct(button) {
    const productContainer = button.closest('.card-container');
    const card = productContainer.querySelector('.card');
    
    // Confirmation avant suppression
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit du panier ?')) {
      // Ajouter une animation de disparition
      card.classList.add('fade-out');
      
      setTimeout(() => {
        productContainer.style.display = 'none';
        updateTotalPrice();
      }, 500);
    }
  }
  
  // Fonction pour gérer le bouton coeur (like)
  function toggleHeart(button) {
    if (button.classList.contains('liked')) {
      button.classList.remove('liked');
      button.style.color = '#6c757d';
      button.title = 'Add to favorites';
    } else {
      button.classList.add('liked');
      button.style.color = '#e91e63';
      button.title = 'Remove from favorites';
    }
  }
  
  // Ajouter les événements aux boutons "+"
  plusButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      incrementQuantity(this);
    });
  });
  
  // Ajouter les événements aux boutons "-"
  minusButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      decrementQuantity(this);
    });
  });
  
  // Ajouter les événements aux boutons de suppression
  deleteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      deleteProduct(this);
    });
  });
  
  // Ajouter les événements aux boutons coeur
  heartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      toggleHeart(this);
    });
  });
  
  // Initialiser le prix total au chargement de la page
  updateTotalPrice();
  
  // Notification de bienvenue dans la console
  setTimeout(() => {
    console.log('🛒 Panier d\'achat initialisé avec succès!');
    console.log('✨ Toutes les fonctionnalités sont opérationnelles:');
    console.log('  • Ajout/suppression de quantités');
    console.log('  • Suppression de produits');
    console.log('  • Favoris (cœur)');
    console.log('  • Calcul automatique du prix total');
  }, 1000);
});