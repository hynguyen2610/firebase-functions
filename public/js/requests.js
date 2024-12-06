const ref = firebase.firestore().collection('requests');

const app = new Vue({
    el: '#app',
    data: {
      // read the requests from firebase
      requests: []
    },
    mounted() {
      ref.onSnapshot(snapshot => {
        this.requests = [];
        snapshot.forEach(doc => {
          this.requests.push({ ...doc.data(), id: doc.id });
        });
      });
    }
  });
