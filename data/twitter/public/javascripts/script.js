const form = document.getElementById('formTweet');
console.log(form);
 
if (form != null) {
   form.addEventListener('submit', function(event){ //on écoute le form
    event.preventDefault(); //annule l'action par défaut du navigateur (la soumission du form en l'occurence)
    //console.log(event);
    let post = document.querySelector("#tweet").value;
    console.log(post);
 
    if (post.length > 280) { //Vérifier la longueur du post
        alert("Trop de caractères"); //si post trop long
    } else { //sinon on traite le post
        // '/tweet'=chemin 
        fetch('/tweets', { //fetch fait appel au serveur, requête http
            method: 'POST', //method pour le crud
            body: JSON.stringify({message: post}), //tranformer en string le contenu de post
            headers: {
                'Content-Type':'application/json' //indication du type
            },
        })
        //pour refresh la page automatiquement une fois qu'on a une réponse du serveur
        //.then(function(){window.location.reload()});
    }
})
}

