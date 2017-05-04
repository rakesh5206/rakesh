sap.ui.controller("physicalinventory.main", {
//coment from git//sdfsfas
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf physicalinventory.main
*/
	onInit: function() {
alert("init");

},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf physicalinventory.main
*/
	onBeforeRendering: function() {
alert("before render");
},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf physicalinventory.main
*/
	onAfterRendering: function() {
alert("after rendering");
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf physicalinventory.main
*/
//	onExit: function() {
//
//	},
handleValueHelp : function (evt) {
	
										var plant = evt.getSource();
										sap.ui.core.plant=plant;
										if(evt.getSource().sId=="idmain1--inp_plant")
											{
												var col1=new sap.m.Column({
													header:new sap.m.Text({
														text:"Plant Code"
													})
												});
												var col2=new sap.m.Column({
													header:new sap.m.Text({
														text:"Plant Name"
													})
												});
												var item1 = new sap.m.ColumnListItem({
											        cells : [
											                 new sap.m.Text({
											                     text : "{werks}"
											                    
											                    
											                 }),
											                 new sap.m.Text({
											                     text : "{NAME1}"
											                    
											                 })]
												});
												var dialog=new sap.m.TableSelectDialog({
													title : "Plant",
													noDataText : "No Data",
													contentWidth : "50%",
													rememberSelections :true,
													confirm:"_handleValueHelpClose",
													/*items: {
														  path: "/d/results/", 
														  template: item1
														 },*/
													columns :[col1,col2],
													confirm: function handleGet(x)
													  {
															    var oContext = x.getParameter('selectedContexts');
															    if (oContext.length) 
															    {
															       oContext.map(function(cont)
															       {
															           var key = cont.getObject().werks;
															           var value = cont.getObject().NAME1;
															           plant.setValue(key);
												
															       })
															    }
													  }
												});
												
												var model=new sap.ui.model.json.JSONModel("/sap/opu/odata/sap/zinventory_count_srv/PLANTSSet");
												model.setSizeLimit(2000);
											this.getView().setModel(model);
											dialog.setModel(model);
											dialog.bindAggregation("items","/d/results/",item1);
											
												dialog.open();
										
										}
	
										else if(evt.getSource().sId=="idmain1--inp_storeloc")
											
										{
													var vw=sap.ui.getCore().byId("idmain1");
													var inp=vw.byId("inp_plant").getValue();
													var cont=sap.ui.getCore().byId("idmain1").getController();
													dialog=sap.ui.xmlfragment("physicalinventory.phyinventory_fragment.dialog_fragment",cont);
													
													var model=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/zinventory_count_srv");
													model.setSizeLimit(2000);
													/*dialog.setModel(model);
													dialog.open();	*/
												
													model.read("/storeloc?werks='"+inp+"'",{ 
														urlParameters:false,
														
													     context:false,
													     async:true,
													     success:function(data)
													     {
													    	 var jsonmodel=new sap.ui.model.json.JSONModel(data);
													    	 
													    	 dialog.setModel(jsonmodel);
													    	 
											
													    	 	dialog.open();	
													    	 	
													     },
													     error:function(error)
													     {
													     
													     }
													
													});
													
											
									
											
										}	
	
	
	
else if(evt.getSource().sId=="idmain1--inp_specialstock")
		
	{
		var vw=sap.ui.getCore().byId("idmain1");
		
		var cont=sap.ui.getCore().byId("idmain1").getController();
		dialog=sap.ui.xmlfragment("physicalinventory.phyinventory_fragment.specialstock_fragment",cont);
		
		var model=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/zinventory_count_srv");
		model.setSizeLimit(2000);
		model.read("/SPECIAL_STOCKSet",{ 
			urlParameters:false,
			
		     context:false,
		     async:true,
		     success:function(data)
		     {
		    	 var jsonmodel=new sap.ui.model.json.JSONModel(data);
		    	 
		    	 dialog.setModel(jsonmodel);
		    	 

		    	 	dialog.open();	
		    	 	
		     },
		     error:function(error)
		     {
		     
		     }
		
		});
		     
		
		
		
		

		
	}	
										
										
										
else if(evt.getSource().sId=="idmain1--inp_material")
	
{
			var vw=sap.ui.getCore().byId("idmain1");
			var inp1=vw.byId("inp_plant").getValue();
			var inp2=vw.byId("inp_storeloc").getValue();
			
			
			var cont=sap.ui.getCore().byId("idmain1").getController();
			dialog=sap.ui.xmlfragment("physicalinventory.phyinventory_fragment.material_fragment",cont);
			
			var model=new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/zinventory_count_srv");
			model.setSizeLimit(2000);
			/*dialog.setModel(model);
			dialog.open();	*/
		
			model.read("/materials?werks='"+inp1+"'&lgort='"+inp2+"'&lifnr=''&sobkz=''&vbeln=''",{ 
				urlParameters:false,
				
			     context:false,
			     async:true,
			     success:function(data)
			     {
			    	 var jsonmodel=new sap.ui.model.json.JSONModel(data);
			    	 
			    	 dialog.setModel(jsonmodel);
			    	 
	
			    	 	dialog.open();	
			    	 	
			     },
			     error:function(error)
			     {
			     
			     }
			
			});
			
	

	
}	

	
	
	
	
	
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	handleClose:function (x){
		
		 var oContext = x.getParameter('selectedContexts');
		
		 if( sap.ui.core.plant.sId=="idmain1--inp_storeloc"){
		 
		 
		    if (oContext.length) 
		    {
		       oContext.map(function(cont)
		       {
		           var key = cont.getObject().LGOBE;
		           var value = cont.getObject().LGORT;
		           sap.ui.core.plant.setValue(value);
		          
		       
		           
		       })
		    }
		 }
		 
		 if( sap.ui.core.plant.sId== "idmain1--inp_specialstock"){
			 
			 
			    if (oContext.length) 
			    {
			       oContext.map(function(cont)
			       {
			           var key = cont.getObject().SOBKZ;
			           var value = cont.getObject().SOTXT;
			           sap.ui.core.plant.setValue(key);
			          
			       
			           
			       })
			    }
			 }
	},
	
	
	additem:function(){
		
		var that=this;
		var cr=that.getView().byId("tbl");
		var item = new sap.m.ColumnListItem({
            cells : [
                     new sap.m.Text({
                         text : "2",
                         wrapping : false
                     }),
                     new sap.m.Input({
                    	
                    	 showValueHelp : true,
                    	 showSuggestion : true,
                    	 valueHelpOnly :true,
                    	 valueLiveUpdate : true,
                    	 
                    	
                     }),
                     new sap.m.Input({
                    	
                    	 showValueHelp : true,
                    	 showSuggestion : true,
                    	 valueHelpOnly :true,
                    	 valueLiveUpdate : true,
                    	 
                    	
               }),
               ///comment
                     new sap.m.Input({
                    	
                    	 showValueHelp : true,
                    	 showSuggestion : true,
                    	 valueHelpOnly :true,
                    	 valueLiveUpdate : true,
                    	 
                    	
                     }),
                     new sap.m.Input({
                    	 
                     }),
                     new sap.m.Button({
                        icon:"sap-icon://delete",
                        press:this.delete
                     })
                 ]
             });
		cr.addItem(item);
	},
	delete:function()
	{
		var vw=sap.ui.getCore().byId("idmain1");
		var table=vw.byId("tbl");
		var rmv=this.getParent();
		table.removeItem(rmv);
	}
		
	
	

});
