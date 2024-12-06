const ref = firebase.firestore().collection('requests');

const app = new Vue({
    el: '#app',
    data: {
      // read the requests from firebase
      requests: []
    },
    mounted() {
        // sort the requests by upvotes
      ref.orderBy('upvotes', 'desc').onSnapshot(snapshot => {
        this.requests = [];
        snapshot.forEach(doc => {
          this.requests.push({ ...doc.data(), id: doc.id });
        });
      })
    }
  });
