(function() {
    return {

        events: {
            'app.activated'                     : 'onActivated',
            'ticket.status.changed'             : 'loadIfDataReady',
            'ticket.collaborators.changed'      : 'displayCollaborators',
            'click .toggle'                     : 'toggleApp'
        },

        onActivated: function() {
            this.doneLoading = false;
            this.loadIfDataReady();
        },

        loadIfDataReady: function() {
            if (!this.doneLoading && this.ticket() !== null) {
                this.doneLoading = true;
                this.ensureTrayVisibility();
                this.displayCollaborators();
            }
        },

        ensureTrayVisibility: function(){
            var tray = services.appsTray();

            if (!tray.isVisible())
                tray.show();
        },

        toggleApp: function(){
            if (this.$('section[data-main]').is(':visible')){
                this.$('section[data-main]').hide();
                this.$('.toggle').text(this.I18n.t('toggle-show'));
            } else {
                this.$('section[data-main]').show();
                this.$('.toggle').text(this.I18n.t('toggle-hide'));
            }
        },

        displayCollaborators: function(){
            var collaborators = this.ticket().collaborators(),
            collaborator_size = _.size(collaborators);

            if (collaborator_size > 0) {
                this.$('h3 small').html('<strong>('+ collaborator_size +')</strong>');

                this.switchTo('collaborators', {
                    collaborators: _.map(collaborators, function(cc){
                        return cc.email();
                    })
                });

                _.times(8, function(){
                    this.$('.alert').fadeToggle('slow');
                }, this);
            }
        }

    };
}());
