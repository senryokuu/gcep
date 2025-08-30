import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonToast } from '@ionic/react';
import { useState } from 'react';
// import './Register.css';
import { registerUser } from './firebaseConfig'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setcPassword] = useState('')
  const [showToast, setShowToast] = useState(false);

  async function register() {
    if (password !== cpassword) {
      setShowToast(true)
      return
    }
    if(username.trim() === '' || password.trim() === '' ) {
      setShowToast(true)
      return
    }
    const res = await registerUser(username, password)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  );
};

export default Register;
