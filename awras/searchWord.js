    $(document).ready(function() { // for searching texts 

        var SearchHistory = [];

        $('#tempword').css({'display':'block'});

        $("#searchInput").on("keypress", function(e) {
	    if (e.which == 13) { // when pressed enter from keyboard
	      //$('#searchresult').html('<div>' + $(this).val() ); //working for search value to put in div
	      $("#wikilogo").hide();
	      $("#result").show();
          var txt = $('#searchInput').val(); // get the value searching for
        // $('#tempword').html($(this).val());
     
	      $(this).val('');
	      $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + encodeURIComponent(txt) + "&callback=?", function(data) { // fetching JSON api
	        var Str = "";
	        //$("#json").html(JSON.stringify(data)); // Fetching Json file for repair purpose
	        var arr = [];
	        for (var key in data.query.pages) {
	          arr.push(key);
	        }
	        arr = arr.join(" ");
	        Str = arr.toString(); // converting array to string format
	        Str = Str.split(" "); // Splitting string Str by space

	        for (var i = 0; i < Str.length; i++) { // Fetching the Contents from the API

	          $('#target').append('<div id="r' + i + '"></div>'); // Create 10 Div element  with id r1 to r10
	          $("#r" + encodeURIComponent(i)).html(i + 1 + ". " + "<a target=\"blank\"href=\"https://en.wikipedia.org/?curid=" + encodeURIComponent(Str[i]) + "\" >" + data.query.pages[Str[i]].title + " " + data.query.pages[Str[i]].extract + "</a> ");

            }           

          });
        }
    });

    $("#btnsearch").on("click", function(e) {
            allresult();
        
    });

    function allresult(){
      $('#searchList').css({'display':'block',  'margin-left': '34%',  'max-width': '400px', ' margin-top': '0%','height':'auto',
    });

var item = $("#searchInput").val();
   // var item = document.getElementById("searchInput").value;
    var date = new Date();
    var ddate = date.toDateString().split("-")[0];
    var time = date.toTimeString().split(" ")[0];
    SearchHistory.push(item);
    
    var tableHTML =
        "<tr id='trnon'>" + 
        "</tr>";
    for(var i = SearchHistory.length - 1; i >= 0; i--){
      tableHTML +=
      "<tr>" + 
      "<td id='" + i + "'>" + SearchHistory[i] +
      "<span>" + ddate+ " "+ time + "</span>" + 
      "</td>" + 
      "</tr>";
    }
    document.getElementById("searchList").innerHTML = tableHTML;
            
    }
   
    $('#tempword').css({'display':'none'});
      }); // key press function ends here



     
   


      

