$.extend({
	Controller:function(view,contacts){
		var self=this;

		view
			.listeners
			.Add = function(data){
				var contact = new contacts(
					null,
					data.nom,
					data.prenom,
					data.email
				);

				view.working();
				contact
					.add()
					.done(function(){
						view.noworking();
						self._reloadContacts();
					});
			}

		view
			.listeners
			.Update = function(data){
				// A completer
			}


		view
			.listeners
			.Delete = function(data){
				// A completer
			}


		this._reloadContacts = function(){
			view.working();
			contacts
				.getAll()
				.done(function(items){
					view.updateTable(items);
					view.noworking();
				})
		}

		this._reloadContacts();
	}
});
