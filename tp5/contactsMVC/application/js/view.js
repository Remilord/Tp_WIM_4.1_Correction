$.extend({
	View:function(){
		var form=$('#form');
		var table=$('#ct');
		var addButton = $('#ajouter');
		var delButton = $('#supprimer');
		var editButton = $('#editer');
		var self=this;
		this.selectedTr=null;
		this.selectedContact = null;

		this._getDataForm=function(){
			return {
				"nom":$('#nom').val(),
				"prenom":$('#prenom').val(),
				"email":$('#email').val()
			}

		}
		this._setDataForm=function (contact){
			$('#nom').val(contact.nom);	
			$('#prenom').val(contact.prenom);	
			$('#email').val(contact.email);	
		}
		this._getDataTr=function(){
			// A completer

		}
		this.updateTable=function(contacts){
			table
				.children("tbody")
				.empty();

			$.each(contacts,function(i,contact){
				table.append("<tr data-id='"+contact.data.id+"'>"
					+"<td>"+contact.data.nom+"</td>"
						+"<td>"+contact.data.prenom+"</td>"
						+"<td>"+contact.data.email+"</td>"
						+"</tr>"
				);		
			});
		};

		this.listeners={
			Add:function(){},
			Update:function(){},
			Delete:function(){}
		};

		$('#ajouter').on("click",function(ev){
			ev.preventDefault();	
			self.listeners.Add(self._getDataForm());	
		})

		$('#supprimer').on("click",function(ev){
			// A completer
		})

		$('#editer').on('click',function(ev){
			// A completer
		})

		$('#ct tbody').on("click","tr",function(ev){
			// A completer
		})


		this.FormReset=function(){
			form[0].reset();

		}
		this.working=function(){
			$('#working').show();
		}
		this.noworking=function(){
			$('#working').hide();
		}
	}
});

