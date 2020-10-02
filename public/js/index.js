"use strict"

jQuery(document).ready(function($){
    let form=$(".new-entry");

    $(form).submit(function(event){
        event.preventDefault();//damit werden unsere Eingabe nicht an den Server geschickt

        let title=$("#title").val();
        let content=$("#content").val();
        alert(title);

        $.ajax({
            url:"/guestbook/new",
            method:"POST",
            data:{
                title:title,
                content:content
            }

        })

    })
})