
(function (global){

	var ns ={};
	var homeHtml="";
	var allCategoriesUrl="data/categories.json";
	var categoriesTitleHtml="snippets/categories-title-snippet.html";
	var randomHtml="snippets/random.html";
	var categoryHtml="snippets/category-snippet.html";
	var catalogItemsUrl="data/catalog/";
	var catalogItemsTitleHtml="snippets/catalog-item-title.html";
	var catalogItemHtml="snippets/catalog-item.html";

	var insertHtml=function(selector, html){
		var targetElem = document.querySelector(selector);
		targetElem.innerHTML=html;
	};

	var showLoading=function(selector){
		var html = "<div class='loading-ajax'>";
		html +="<img src='img/ajax-loader.gif' alt=''loading></div>"
		insertHtml(selector,html);
	}

	var insertProperty = function(string, propName, propValue){
		var propToReplace="{{"+propName+"}}";
		string=string
		.replace(new RegExp(propToReplace,"g"), propValue);
		return string;
	}

	document.addEventListener("DOMContentLoaded", function(event){
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
		allCategoriesUrl,
			buildAndShowCategoriesHTML);
	});

	ns.loadCatalogCategories=function(){
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
			allCategoriesUrl,
			buildAndShowCategoriesHTML);
	};

	ns.loadCatalogItems=function(categoryShort){
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
			catalogItemsUrl+categoryShort+".json",
			buildAndShowCatalogItemsHTML);
	};
	//random
	ns.loadRandomCatalogItems = function(randomCategoryShort) {
        var letters = "ABCD";
        var randomIndex = Math.floor(Math.random() * letters.length);
        randomCategoryShort = letters[randomIndex];

               showLoading("#main-content");
               $ajaxUtils.sendGetRequest(
                       catalogItemsUrl + randomCategoryShort + ".json",
                       buildAndShowCatalogItemsHTML);
};

		

	function buildAndShowCategoriesHTML(categories) {
	    $ajaxUtils.sendGetRequest(
	        categoriesTitleHtml,
	        function(categoriesTitleHtml) {
	            $ajaxUtils.sendGetRequest(
	                categoryHtml,
	                function(categoryHtml) {
	                    $ajaxUtils.sendGetRequest(
	                        randomHtml,
	                        function(randomHtml) {
	                            var categoryViewHtml =
	                                buildCategoriesViewHtml(categories,
	                                    categoriesTitleHtml, categoryHtml, randomHtml);
	                            insertHtml("#main-content", categoryViewHtml);
	                        },
	                        false);
	                },
	                false);
	        },
	        false);
	}

	function buildCategoriesViewHtml(categories,
		categoriesTitleHtml, categoryHtml,randomHtml){
		var finalHtml=categoriesTitleHtml;
		var finalRandom=randomHtml;

		
		finalHtml+="<section class='row'>";
		for (var i = 0; i < categories.length; i++) {
			var html = categoryHtml;
			var name=""+categories[i].name;
			var short_name=categories[i].short_name;
			var notes=categories[i].notes;
			html=
			insertProperty(html,"name",name);
			html=
			insertProperty(html,"short_name",short_name);
			html=
			insertProperty(html,"notes",notes);
			finalHtml+=html;


		}
		finalHtml+=finalRandom;
		finalHtml+="</section>";
		
		return finalHtml;
		
	}

	function buildAndShowCatalogItemsHTML(categoryCatalogItems){
		$ajaxUtils.sendGetRequest(
			catalogItemsTitleHtml,
			function(catalogItemsTitleHtml){
				$ajaxUtils.sendGetRequest(
					catalogItemHtml,
					function(catalogItemHtml){
						var  catalogItemsViewHtml=
						buildCatalogItemsViewHtml(categoryCatalogItems,
							catalogItemsTitleHtml,
							catalogItemHtml);
						insertHtml("#main-content",catalogItemsViewHtml);
					},
					false);

			},
			false);
	}

	function buildCatalogItemsViewHtml(categoryCatalogItems, catalogItemsTitleHtml, 
		catalogItemHtml){
		
		var finalHtml = catalogItemsTitleHtml;
		finalHtml+="<section class='row'>";
	
			var catalogItems=categoryCatalogItems.catalog_items;
		for (var i = 0; i < catalogItems.length; i++) {
			var html =catalogItemHtml;
			var name =catalogItems[i].name;
			var short_name=catalogItems[i].short_name;
			var description=catalogItems[i].description;
			var price= catalogItems[i].price;
			html=
			insertProperty(html,
				"name",name);
			html =
			insertProperty(html, "short_name", catalogItems[i].short_name);
		
		    html=
			insertProperty(html,
				"description",description);
			html=
			insertProperty(html,
				"price",price);
			
			
			

			finalHtml+=html;
		}
		finalHtml+="</section>";
		return finalHtml;
	}

	

	global.$ns=ns;

})(window);
