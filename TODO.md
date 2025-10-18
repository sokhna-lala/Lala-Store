# TODO: Modifier la validation de commande dans le panier

## Étapes à suivre :

- [x] Ajouter des états pour le modal : showModal (boolean), paymentMethod ('wave' | 'orange'), phone (string), address (string)
- [x] Modifier handleValidate pour ouvrir le modal au lieu de la boîte de confirmation
- [x] Créer le JSX du modal avec :
  - Liste des produits dans le panier
  - Montants totaux
  - Boutons radio pour Wave et Orange Money
  - Champs de saisie pour téléphone et adresse
  - Boutons Annuler et Confirmer
- [x] Ajouter fonctions pour gérer la confirmation (validation, vider panier, fermer modal) et annulation (fermer modal)
- [x] Styler le modal avec Tailwind CSS
- [x] Tester le modal en exécutant l'app
