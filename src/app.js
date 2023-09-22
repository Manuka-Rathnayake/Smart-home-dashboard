import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, doc, getDoc,setDoc, updateDoc } from 'firebase/firestore';


const PORT = process.env.PORT || 4001;

const expressapp = express();
const httpServer = http.createServer(expressapp);
const io = new Server(httpServer, { cors: { origin: '*' } });

expressapp.use(express.static('src/ui'));


const firebaseConfig = {
    apiKey: "AIzaSyD5xOd_gq8l0dX8gfjrE66ab53URR8QXSY",
    authDomain: "smart-home-dashboard-18f8f.firebaseapp.com",
    projectId: "smart-home-dashboard-18f8f",
    storageBucket: "smart-home-dashboard-18f8f.appspot.com",
    messagingSenderId: "232876551894",
    appId: "1:232876551894:web:800bfee306a8237dbfe377"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const switchStatesCollection = collection(db, 'SwitchStates');


  async function getButtonStates() {
    const q = query(switchStatesCollection, where('Switch', 'in', ['buttonState1', 'buttonState2', 'buttonState3', 'buttonState4']));
  
    try {
      const querySnapshot = await getDocs(q);
  
      const buttonStates = {};
  
      querySnapshot.forEach((doc) => {
        buttonStates[doc.data().Switch] = doc.data().State;
      });
  
      return buttonStates;
    } catch (error) {
      console.error('Error fetching button states from Firestore:', error);
      return {};
    }
  }

io.on('connection', async (socket) => {
    console.log('New Connection');

    const initialButtonStates = await getButtonStates();

    socket.emit('buttonState1', initialButtonStates['buttonState1']);
    socket.emit('buttonState2', initialButtonStates['buttonState2']);
    socket.emit('buttonState3', initialButtonStates['buttonState3']);
    socket.emit('buttonState4', initialButtonStates['buttonState4']);
    
    socket.on('disconnect', () => {
        console.log('Disconnected');
    });

    socket.on('buttonState1', async value => {
        console.log('buttonState1:', value);
        const docRef = doc(db, 'SwitchStates','vn66kk9khKYbG1DZHKNP')
        try {
            await updateDoc(docRef, {
                State: value,
            });
            console.log('Document updated successfully');
        } catch (error) {
            console.error('Error updating Firestore:', error);
        }
        socket.broadcast.emit('buttonState1', value);
    });

    socket.on('buttonState2', async value => {
        console.log('buttonState2:', value);
        const docRef = doc(db, 'SwitchStates','fVkfDJaYpBSHRfojoNkX')
        try {
            await updateDoc(docRef, {
                State: value,
            });
            console.log('Document updated successfully');
        } catch (error) {
            console.error('Error updating Firestore:', error);
        }
        socket.broadcast.emit('buttonState2', value);
    });

    socket.on('buttonState3', async value => {
        console.log('buttonState3:', value);
        const docRef = doc(db, 'SwitchStates','p47mCG8eE3qC5DwmMEJw')
        try {
            await updateDoc(docRef, {
                State: value,
            });
            console.log('Document updated successfully');
        } catch (error) {
            console.error('Error updating Firestore:', error);
        }
        socket.broadcast.emit('buttonState3', value);
    });
    socket.on('buttonState4', async value => {
        console.log('buttonState4:', value);
        const docRef = doc(db, 'SwitchStates','k2pvQYXHeuadIAulPObI')
        try {
            await updateDoc(docRef, {
                State: value,
            });
            console.log('Document updated successfully');
        } catch (error) {
            console.error('Error updating Firestore:', error);
        }
        socket.broadcast.emit('buttonState4', value);
    });
    
  });
  
httpServer.listen(PORT, () => {
    console.log('Running on : ', httpServer.address());
});
