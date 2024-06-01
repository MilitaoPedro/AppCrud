import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '@/FirebaseConfig';

export const addMember = async (member) => {
    try {
        if(member.image == null || member.image == ''){
            member.image = 'https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600nw-1697898655.jpg'
        }
        const docRef = await addDoc(collection(FIREBASE_DB, 'membros'), member);

        member.nome = '';
        member.email = '';
        member.idade = 0;
        member.numMatricula = 0;
        member.image = '';

        console.log("Document written with ID: ", docRef.id);
        // Refetch the member to update the list
        const querySnapshot = await getDocs(collection(FIREBASE_DB, 'membros'));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        return items; // Return the updated list of members
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }
};

export const deleteMember = async (memberId) => {
    try {
        await deleteDoc(doc(FIREBASE_DB, 'membros', memberId));
        console.log("Document with ID:", memberId, "deleted successfully");
        // Refetch the data to update the list
        const querySnapshot = await getDocs(collection(FIREBASE_DB, 'membros'));
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
        });
        return items; // Return the updated list of members
    } catch (e) {
        console.error("Error deleting document: ", e);
        throw e;
    }
};

export const updateMember = async (memberId, updatedFields) => {
    try {
        const memberRef = doc(FIREBASE_DB, 'membros', memberId);
        await updateDoc(memberRef, updatedFields);
        console.log("Document with ID:", memberId, "updated successfully");

        const querySnapshot = await getDocs(collection(FIREBASE_DB, 'membros'));
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
        });
        return items;
    } catch (e) {
        console.error("Error updating document: ", e);
        throw e;
    }
};