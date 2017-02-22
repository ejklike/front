import React from 'react';
import update from '../../../node_modules/react-addons-update';
import dummy from './dummy.json';

class Cluster extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         clusters: []
      };
   }

   componentDidMount() {
    this.setClusters();
   }

   componentDidUpdate(prevProps) {
      if(this.props.isPressed !== prevProps.isPressed) {
         if(this.props.isPressed) {
            this.showClusters();
         } else {
            this.hideClusters();
         }
      }
   }

   setClusters() {
     console.log("length", dummy.length);
      for(let i=0; i<dummy.length; i++) {
        let clusterPromise = new Promise(function(resolve, reject) {
          let pref = {
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          center: {lat: dummy[i].lat, lng: dummy[i].lng},
          radius: dummy[i].radius,
          description: dummy[i].description
        };

        let cluster = new window.google.maps.Circle(pref);
        });
        
        let vm = this;
        Promise.all([clusterPromise]).then(function(results) {
            vm.setState({
          clusters: update(
          vm.state.clusters, { $push: [vm.cluster] })
        });
        })

         
      }

      console.log("dho?KJl;kad", this.state.clusters.length);
   }

   showClusters() {
     console.log("size", this.state.clusters.length);
     for(let i=0; i<this.state.clusters.length; i++) {
       this.state.clusters[i].setMap(this.props.map);
     }
   }

   hideClusters() {
      for(let i=0; i<this.state.clusters.length; i++) {
         this.state.clusters[i].setMap(null);
      }
   }

   render() {
      return null;
   }

}

export default Cluster;