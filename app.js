(function() {
    return {

        events: {
            'app.activated':               'onActivated',
            'ticket.status.changed':       'loadIfDataReady'
        },

        onActivated: function() {
            this.doneLoading = false;
            this.loadIfDataReady();
        },

        loadIfDataReady: function() {
            if ( !this.doneLoading && this.ticket() !== null) {
                this.doneLoading = true;
                this.displayCollaborators();
            }
        },

        displayCollaborators: function(){
            var collaborators = this.ticket().collaborators(),
            collaborator_size = _.size(collaborators);

            if (collaborator_size > 0) {
                this.$('h3 small').text('('+ collaborator_size +')');

                this.switchTo('collaborators', {
                    collaborators: _.map(collaborators, function(cc){
                        return cc.name();
                    })
                });
            }
        }

    };
}());
