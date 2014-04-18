

var RHITmoodle = {
    /*
    currentQuarter: "",
    showFutureQuarters: true,
    showPastQuarters: false,
    */
    load: function() {
      $("ul.tabs").tabs("div.panes > div");
      $('#save').click(this.storeDataDev1);
      $('#save2').click(this.storeDataDev2);
      this.loadData();
    },

    getSettingsData: function(){
      var obj = {};
      if(safari.extension.settings.CHE411Lab){
        obj['CHE411Lab'] = safari.extension.settings.CHE411Lab;
      }
      if(safari.extension.settings.currentQuarter){
        obj['currentQuarter'] = safari.extension.settings.currentQuarter;
      }
      if(safari.extension.settings.showPastQuarters){
        obj['showPastQuarters'] = safari.extension.settings.showPastQuarters;
      }
      if (safari.extension.settings.showFutureQuarters){
        obj['showFutureQuarters'] = safari.extension.settings.showFutureQuarters;
      }
      if(safari.extension.settings.ascending){
        obj['ascending'] = safari.extension.settings.ascending;
      }
      return obj;
    },

    loadData: function(){
        var obj = this.getSettings();
        if(obj.currentQuarter){
        $("#quartersList").val(obj.currentQuarter);
        }
        if(obj.showPastQuarters){
        $("#showPastQuarters").attr("checked", obj.showPastQuarters);
        }else{
        $("#showPastQuarters").attr("checked", obj.showPastQuarters);
        }
        if(obj.showFutureQuarters){
            $("#showFutureQuarters").attr("checked", obj.showFutureQuarters);
        }else{
            $("#showFutureQuarters").attr("checked", obj.showFutureQuarters);
        }
        if(obj.showFutureQuarters){
            $("#ascending").attr("checked", obj.ascending);
        }else{
            $("#ascending").attr("checked", obj.ascending);
        }
        if(obj.showFutureQuarters){
            $("#CHE411Lab").attr("checked", obj.CHE411Lab);
        }else{
            $("#CHE411Lab").attr("checked", obj.CHE411Lab);
        }
        return obj;
    },

    storeDataDev1: function(){
    var selected = $('#quartersList').find(":selected").text();
    var showPastQuartersChecked = document.getElementById("showPastQuarters").checked;
    var showFutureQuartersChecked  = document.getElementById("showFutureQuarters").checked;
    var ascendingChecked  = document.getElementById("ascending").checked;
        safari.extension.settings.currentQuarter = selected;
        safari.extension.settings.showPastQuarters = showPastQuartersChecked;
        safari.extension.settings.showFutureQuarters = showFutureQuartersChecked;
        safari.extension.settings.ascending = ascendingChecked;
        safari.self.hide();
    },
    
    storeDataDev2: function(){
    var che411LabChecked = document.getElementById("CHE411Lab").checked;
        safari.extension.settings.CHE411Lab = che411LabChecked;
        safari.self.hide();
    }
};

function respondToDataRequest(data, event){
    event.target.page.dispatchMessage("theData", data);
};

function sendSettingsDataToContentScript(event) {
    var obj = RHITmoodle.getSettingsData();
    event.target.page.dispatchMessage("RHITmoodleSettingsData", obj);
};
 
function respondToMessage(theMessageEvent) {
    if(theMessageEvent.name === "getSettingsData") {
        sendSettingsDataToContentScript( theMessageEvent);
    }
};

safari.application.addEventListener("message",respondToMessage,false);
safari.application.addEventListener('popover', function(event) {
    RHITmoodle.load();
}, false);

document.addEventListener('DOMContentLoaded', function () {
  
  
});
window.onload=function(){
    $("ul.tabs").tabs("div.panes > div");
    RHITmoodle.load();
};