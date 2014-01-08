(function() {
  return {
   events: {
      'app.activated'                     : 'onAppActivated',
      'ticket.collaborators.changed'      : 'displayCollaborators',
      'click .toggle'                     : 'toggleApp'
    },

    onAppActivated: function(app) {
      if (app.firstLoad) {
        this.initialize();
      }
    },

    initialize: function() {
      this.ensureTrayVisibility();
      this.displayCollaborators();
    },

    ensureTrayVisibility: function(){
      var appTray = services.appsTray();

      if (!appTray.isVisible()) {
        appTray.show();
      }
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
      } else {
        this.$('h3 small').html('');
        this.$('section[data-main]').html('');
      }
    }

  };
}());
