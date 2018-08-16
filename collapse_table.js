function collapse_table(json,id,title){
    var htm='',tot=0,vw;
    if(id){
        htm='<div class="collapse_report textRight">'+
            '<e class="floatLeft">'+title+'</e>'+
            '<b onclick="collapse_report(\'collapse_'+id+'\',1)"><i class="fa fa-arrow-circle-down"></i></b>'+
            '<b onclick="collapse_report(\'collapse_'+id+'\',0)"><i class="fa fa-arrow-circle-up"></i></b>'+
            '<b onclick="collapse_report(\'collapse_'+id+'\',2)"><i class="fa fa-arrow-circle-right"></i></b>'+
        '</div>'+
        '<table id="collapse_'+id+'" class="collapse_report">';
    }
    else htm='<table class="collapse_report">';
    
    for(var i=0;i<json.length;i++){
        var tree='',tree_class='';
        if($.isArray(json[i][2])){
            var t=collapse_table(json[i][2]);
            json[i][2]=t[1];
            tree=t[0];
            tree_class=' class="list'+( (json[i][3] == 'f') ? ' oppn' : (json[i][3] == 'o') ? ' open' : '' )+'"';
        }
        vw = (json[i][1] == 's') ? 'w' : 'v';
        htm+='<tr'+tree_class+'><td></td><td><h>'+json[i][0]+'</h> <'+vw+'>'+json[i][2]+'</'+vw+'>'+tree+'</td></tr>';
        if(json[i][1] == 's') tot-=json[i][2]*1; else tot+=json[i][2]*1;
    }
    
    htm+='</table>';
    if(id){
        $("#"+id).html(htm);
        collapse_report();
    }
    else return [htm,tot];
}

function collapse_report(id,all){
    if(all == 0){
        $("#"+id+" .list").removeClass('open');
    }
    else if(all == 1){
        $("#"+id+" .list").addClass('open');
    }
    else if(all == 2){
        $("#"+id+" .open > td > table > tbody > .list").addClass('open');
        $("#"+id+" > tbody > .list").addClass('open');
    }
    else{
        $(".list:not(.oppn) > td:first-child").off("click").on('click',function(e){
            e.stopPropagation();
            e.stopImmediatePropagation();
            $(this).parent().toggleClass('open');
        });
    }
}
