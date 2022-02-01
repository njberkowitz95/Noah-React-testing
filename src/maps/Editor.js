import React, { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";


export const Editor = () => {
  const mapRef = useRef();

  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(["esri/WebMap", "esri/views/MapView", "esri/widgets/Search", "esri/widgets/LayerList", "esri/widgets/Home", "esri/widgets/Home"], {
      css: true
    }).then(([WebMap, MapView, Search, LayerList, Home]) => {
      // Create a map from the referenced webmap item id
      let webmap = new WebMap({
        basemap: "topo-vector",
        portalItem: {
          id: "dea7d5d061f048d09d053a65bcc5e15c"
        }
      });

      let view = new MapView({
        container: mapRef.current,
        zoom: 5,
        center: [78, 22],
        map: webmap
      });

      view.when(function() {
        view.popup.autoOpenEnabled = true; //disable popups

        // Create the Editor
        let tor = new Search({
          view: view
        }); 

        // Add widget to top-right of the view
        view.ui.add(tor, "top-right");

        // Create the Editor
        let lod = new LayerList({
        view: view
        });

        // Add widget to top-right of the view
        view.ui.add(lod, "bottom-right");

        // Create the Editor
        let rul = new Home({
        view: view
        });
    
        // Add widget to top-right of the view
        view.ui.add(rul, "top-left");


      });
      return () => {
        if (view) {
          // destroy the map view
          view.container = null;
        }
      };
    });
  });

  return (
    <>
      <div className="webmap" ref={mapRef} /> <div id="editorDiv" />
    </>
  );
};
