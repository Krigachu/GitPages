//Account creation alert
function accountCreationAlert() {
    //alert(document.getElementById("firstName").innerHTML + " Account created");
  
    const signUpButton = document.getElementById("sign-up-button");
  
    signUpButton.addEventListener("sign-up-pressed", function (e){
      window.alert(e.detail.name)
      }
    );
  
    const event = new CustomEvent("sign-up-pressed", {
      detail: {
        name: "Dee Double U"
      }
    });
  
    signUpButton.dispatchEvent(event);
  
  }
  
  //checking if a check box has been interacted with
  function boxChecked(id){
    genre = document.getElementById(id);
    //console.log("Check box has been interacted for "+ genre.value + " aight");
    //console.log(genre.checked + " This is the value of the element");
    genreData = (genre.value + "|");
  
    //appends genre to genre attribute in datalayer
    if(genre.checked === true){
      digitalData.page.attributes.genres += genreData;
    }
  
    else{
      var stringA = genreData,
      stringB = digitalData.page.attributes.genres,
      firstOccurrence = stringB.indexOf(stringA);
  
      if(firstOccurrence === -1)
        {
          console.log("String not found");
        }
  
      else{
        var stringALength = stringA.length;
        var newString;
  
        //if genre is first in digitalData genre string
        if(firstOccurrence === 0)
        {
          newString = stringB.substring(stringALength);
        }
  
        //if genre is elsewhere in digitalData genre string
        else
        {
          newString = stringB.substring(0, firstOccurrence);
          newString += stringB.substring(firstOccurrence + stringALength);
        }
        //console.log(newString);
        digitalData.page.attributes.genres = newString;
      }
    }
  }
  
  //filters the games list to match interactive recommender
  function filterGamesList() {
    isEventsUndefined(s.events);
    s.events += "event11,";
    //console.log(s.events);
  
    var input, filter, table, tr, td, i, txtValue;
    //input = document.getElementById("myInput");
    filter = digitalData.page.attributes.genres.split("|");
    filter.pop();
    table = document.getElementById("games_list");
    tr = table.getElementsByTagName("tr");
    indexToDisplay = [];
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      tr[i].style.display = "none";
      if (td) {
        txtValue = td.textContent || td.innerText;
        //console.log(txtValue);
        filter.forEach(element => {
          //console.log(element);
          if (txtValue === element) {
            //console.log("True");
            //tr[i].style.display = "";
            indexToDisplay.push(i);
          }
        })
          // maybe make an array of indexes and then go through table and where index is matching, display
      }
    }
    if(indexToDisplay.length === 0){
      for (a = 0; a < tr.length; a++) {
        tr[a].style.display = "";
      }
    }else{
      for (a = 0; a < tr.length; a++) {
        indexToDisplay.forEach(element => {
          if(a === element){
            tr[a].style.display = "";
          }
        })
      }
    }
  
  }
  
  //
  function downloadLinks(id){
    //console.log(id + " Testing tracker ID");
    isEventsUndefined(s.events);
    isProductsUndefined(s.products);
    s.events += "event13,";
    s.products += ";"+id+";;;;,";
    //console.log(s.events);
    //console.log(s.products);
  
  }
  
  //checks if s.events is undefined, if so, set to empty string
  function isEventsUndefined(testVar){
    if(testVar === undefined){
      s.events = "";
    }
  }
  
  //checks if s.products is undefined, if so, set to empty string
  function isProductsUndefined(testVar){
    if(testVar === undefined){
      s.products = "";
      }
  }
  
  //passes relevant data from interactive recommender page to purchase page
  function passDataInteractiveToPurchase(id){
  
    //loop through digitalData.product[]
    digitalData.product.forEach(element => {
      if (id === element.productInfo.productName){
        sessionStorage.setItem("productName", id);
        //console.log(element.productInfo.productName + " Prod Name");
  
        sessionStorage.setItem("productQuantity", element.productInfo.quantity);
        //console.log(element.productInfo.quantity + " Prod Quantity");
  
        sessionStorage.setItem("productCategory", element.category.primaryCategory);
        //console.log(element.category.primaryCategory + " Prod Category");
  
        sessionStorage.setItem("productPrice", element.attributes.price);
        //console.log(element.attributes.price + " Prod Price");
  
        sessionStorage.setItem("genresSelected", digitalData.page.attributes.genres);
  
  
        isEventsUndefined(s.events);
        isProductsUndefined(s.products);
  
        s.events += "scAdd";
  
        if(!(sessionStorage.getItem("genresSelected") == "")){
          s.products += (element.category.primaryCategory + ";" + element.productInfo.productName + ";" + element.productInfo.quantity + ";" + element.attributes.price + ";;eVar11 = "+ digitalData.page.attributes.genres +",");
        }
        else {
          s.products += (element.category.primaryCategory + ";" + element.productInfo.productName + ";" + element.productInfo.quantity + ";" + element.attributes.price + ";;,");
        }
  
  
        //console.log(s.events);
        //console.log(s.products);
  
      }
  
    })
  
    //testPassPurchaseData();
    setTimeout(function(){location.href = "purchase-page.html";},2000);
    //location.href = "purchase-page.html";
  
  }
  
  function loadPurchasePage(){
    digitalData.product[0].productInfo.productName = sessionStorage.getItem("productName");
    digitalData.product[0].productInfo.quantity = sessionStorage.getItem("productQuantity");
    digitalData.product[0].category.primaryCategory = sessionStorage.getItem("productCategory");
    digitalData.product[0].attributes.price = sessionStorage.getItem("productPrice");
  
    purchaseHeading = document.getElementById("purchase_title");
    purchaseHeading.innerHTML = "Purchase: " + sessionStorage.getItem("productName");
  
    var productName = sessionStorage.getItem("productName");
    //console.log(productName + " This is the prod name assigned")
    table = document.getElementById("purchase_table_body");
    row = table.insertRow(-1);
  
  
    firstCell = row.insertCell(0);
    nameTextValue = document.createTextNode(sessionStorage.getItem("productName"));
    firstCell.appendChild(nameTextValue);
  
    genre = row.insertCell(1);
    genre.innerHTML = sessionStorage.getItem("productCategory");
  
    price = row.insertCell(2);
    price.innerHTML = sessionStorage.getItem("productPrice");
  
    //quantity = row.insertCell();
    //quantity.innerHTML = sessionStorage.getItem("productQuantity");
  
  }
  
  function purchase(){
    isEventsUndefined(s.events);
    isProductsUndefined(s.products);
  
    s.events += "event7,purchase,";
  
    if(!(sessionStorage.getItem("genresSelected") == "")){
      s.products += (digitalData.product[0].category.primaryCategory + ";" + digitalData.product[0].productInfo.productName + ";" + digitalData.product[0].productInfo.quantity + ";" + digitalData.product[0].attributes.price + ";;eVar11 = "+ sessionStorage.getItem("genresSelected") +",");
    }
    else {
      s.products += (digitalData.product[0].category.primaryCategory + ";" + digitalData.product[0].productInfo.productName + ";" + digitalData.product[0].productInfo.quantity + ";" + digitalData.product[0].attributes.price + ";;");
  
    }
  
    //console.log(s.events);
    //console.log(s.products);
  
    setTimeout(function(){location.href = "thankyou-page.html";},2000);
    //location.href = "thankyou-page.html";
  }
  
  function purchaseCancel(){
    isEventsUndefined(s.events);
    isProductsUndefined(s.products);
  
    s.events += "event8";
    s.products += (digitalData.product[0].category.primaryCategory + ";" + digitalData.product[0].productInfo.productName + ";" + digitalData.product[0].productInfo.quantity + ";" + digitalData.product[0].attributes.price + ";;");
  
    //console.log(s.events);
    //console.log(s.products);
  
    sessionStorage.clear();
  
    setTimeout(function(){location.href = "index.html";},2000);
    //location.href = "index.html";
  }
  
  function clearSessionStorage(){
    sessionStorage.clear();
  }
  
  function dudLocation(){
    location.href="dud";
  }
  
  function testingDirectCall(){
    _satellite.track("w3-site",{doo : "doo", coo : "coo"})
  }
  
  function testingOverride(){
    _satellite.track("Targeting_Cookies")
  }
  
  function testingDLM(){
    appEventData.push({
      "event": "test",
      "payload" :{
        "message" : "The message is Test"
      }
    })
  }
  