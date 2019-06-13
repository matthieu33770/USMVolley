function commande(nom, argument){
    if (typeof argument === 'undefined') {
        argument = '';
    }
    // Exécuter la commande
    document.execCommand(nom, false, argument);
}