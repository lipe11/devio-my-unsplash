import { initializeApp } from 'firebase/app'
import { ref } from 'vue'
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'

const app = initializeApp({
  apiKey: 'AIzaSyBj_qz3DuEQ4Pcn6f1k6jb9D_A1JreEpBc',
  projectId: 'devio-file-uploader',
  appId: '1:992158096917:web:1b173fa6cc85a8260b381c',
  measurementId: 'G-0H2RR4YXHM',
})

const db = getFirestore(app)
const imagesCollection = collection(db, 'images')

export function useImages() {
  const images = ref([])
  const imgQuery = query(imagesCollection, orderBy('timestamp', 'desc'))

  onSnapshot(imgQuery, (snap) => {
    images.value = []
    snap.forEach((doc) => images.value.push({ id: doc.id, ...doc.data() }))
  })

  function addImage(label, url) {
    return addDoc(imagesCollection, {
      label,
      url,
      timestamp: serverTimestamp(),
    })
  }

  function deleteImage(id) {
    return deleteDoc(doc(imagesCollection, id))
  }

  return { images, addImage, deleteImage }
}
