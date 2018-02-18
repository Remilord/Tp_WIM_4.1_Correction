var serviceUrl = "/~denis/rest/contacts";

// a configurer vers votre propre url !


$.extend({
	Contact:function(id,nom,prenom,email){
		var self = this;
		this.data={
			"id":id,
			"nom":nom,
			"prenom":prenom,
			"email":email
		};

		this.add=function(){
			return		$.ajax({
				url : serviceUrl,
				method:"post",
				processData:false,
				contentType:"application/json",
				data:JSON.stringify(this.data),
			})
				.then(function(data){
					return new Contact(
						null,
						data.nom,
						data.prenom,
						data.email
					)
				})
		};

		this.update=function(){
			// A completer
		};

		this.delete=function(){
			// A completer
		};
	}
});

$.Contact.getAll=function(){
	return 	$.getJSON(serviceUrl,null)
		.then(function(data){
			var items=[];
			$.each(data.contacts,function(i,el){
				items
					.push(
						new $.Contact(el.id,el.nom,el.prenom,el.email)
					);	
			})
			return items;
		});
}
