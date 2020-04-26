<template>
    <b-container class="bv-example-row">
        <h2> Place Order</h2>
  <b-row>
    <b-col cols="6">
        <img src="https://www.clinisciences.com/es/upload/thumbs/adobestock-329121451-wk3kx4-06d27b.jpg" alt="immunoassay" fluid>

    </b-col>
    <b-col cols="6">
        <h3>Diagnosis Tests</h3>
        <b-row style="margin-top: 2em">
            <b-col>
                <b-form inline>
                    <label for="textarea-default">Quantity:</label>
                    <div class="quantity-toggle">
                        <button @click.prevent="decrement()">&mdash;</button>
                        <input type="text" :value="quantity" readonly>
                        <button @click.prevent="increment()">&#xff0b;</button>
                    </div>
                </b-form>
            </b-col>
            <b-col>
                <label for="textarea-default">Price: $</label>
                <span>{{price}}</span>
            </b-col>
        </b-row>
        <b-row class="mt-2" style="margin-top:20px" >
            <b-col sm="2">
            <label for="textarea-default">Address:</label>
            </b-col>
            <b-col sm="10">
            <b-form-textarea
                id="textarea-default"
                placeholder="Enter Address"
                v-model="address"
                required
            ></b-form-textarea>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
        <b-button style="margin-top:20px" @click.prevent="placeOrder">Order now</b-button>
            </b-col>
            <b-col><span style="color:red;margin-left:2em">{{error}}</span></b-col>
        </b-row>
    </b-col>
  </b-row>
</b-container>
</template>


<script>
import firebase from "firebase";
export default {

    data() {
    return {
      quantity: 1,
      address: "",
      error:"",
      };
      

  },
  computed : {
      price: function(){
          return this.quantity * 10;
      }
  },
  methods: {
    increment() {
      this.quantity++;
    },
    decrement() {
      if (this.quantity === 1) {
        alert('Negative quantity not allowed');
      } else {
        this.quantity--;
      }
    },
    placeOrder() {
        var user = firebase.auth().currentUser;
        var db=firebase.firestore();
        if(this.address!="")
        {
            db.collection('orders').add({
            UID: user.uid,
            Quantity:this.quantity,
            Address:this.address,
            Price: this.price
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            this.quantity=1;
            this.address ="";
        }
        else 
        {
            this.error="Address cannot be empty"
        }
        
    }
  }
    
}
</script>


<style scoped>
    b-row {
        margin-top: 20px;
    }
    img {
        margin-top: 60px;
    }
    pre {
  background: #eee;
  padding: 1rem;
  border-radius: 5px;
}

.quantity-toggle {
  display: -webkit-box;
  display: flex;
  margin-left: 2em;
}
.quantity-toggle input {
  border: 0;
  border-top: 2px solid #ddd;
  border-bottom: 2px solid #ddd;
  width: 2.5rem;
  text-align: center;
  padding: 0 .5rem;
}
.quantity-toggle button {
  border: 2px solid #ddd;
  padding: .5rem;
  background: #f5f5f5;
  color: #888;
  font-size: 1rem;
  cursor: pointer;
}

</style>