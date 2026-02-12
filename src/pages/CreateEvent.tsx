import React, { useState } from 'react';
import {
  IonButton,
  IonCol,
  IonContent,
  IonDatetime,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonToast,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { uploadImage } from '../utils/uploadEventImage';


const CreateEvent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filter1, setFilter1] = useState('');
  const [filter2, setFilter2] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const history = useHistory();

  const currentUser: User | null = auth.currentUser;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    // Upload image to Netlify Storage or Firebase
    let imageUrl = 'assets/default.jpg';

    if (imageFile) {
      const reader = new FileReader();

      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]); // remove "data:image/jpeg;base64," prefix
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });

      // Upload directly to Firebase Storage
      imageUrl = await uploadImage(imageFile.name, base64);
    }

      // Safe handling of date and time (IonDatetime-friendly)
      let timedate: Date;

      const datePart = date ? new Date(date) : null;
      const timePart = time ? new Date(time) : null;

      if (datePart && !isNaN(datePart.getTime()) && timePart && !isNaN(timePart.getTime())) {
        // combine date from datePart + time from timePart
        timedate = new Date(
          datePart.getFullYear(),
          datePart.getMonth(),
          datePart.getDate(),
          timePart.getHours(),
          timePart.getMinutes(),
          0,
          0
        );
      } else {
        timedate = new Date(); // fallback
      }

    // Add event to Firestore
    await addDoc(collection(db, 'events'), {
      title,
      desc: description,
      tags: [filter1, filter2].filter(Boolean),
      timedate,
      image: imageUrl,
      cAt: serverTimestamp(),
      cBy: currentUser ? currentUser.uid : 'unknown', // dynamic user ID
    });

    setToastMessage('Event created successfully!');
    setShowToast(true);

    // Redirect after short delay
    setTimeout(() => history.push('/home'), 1500);
  } catch (error) {
    console.error('Error creating event:', error);
    setToastMessage('Failed to create event.');
    setShowToast(true);
  }
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="assets/favicon.png"
              alt="logo"
              style={{ width: '40px', height: '40px', marginBottom: '10px', marginLeft: '20px' }}
            />
            <IonTitle style={{ marginTop: '5px' }}>Create Event</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size-md="6" offset-md="3" size-xs="12">
              <form
                onSubmit={handleSubmit}
                style={{ padding: 20, boxShadow: '0 0 30px rgba(0,0,0,0.2)' }}
              >
                <IonItem>
                  <div style={{ marginTop: 15, flexDirection: 'column' }}>
                    <IonLabel>Upload Event Image</IonLabel>
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginTop: 8 }} />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ marginTop: 10, maxWidth: '100%', borderRadius: 8 }}
                      />
                    )}
                  </div>
                </IonItem>

                <IonItem>
                  <IonLabel position="stacked">Event Name</IonLabel>
                  <IonInput
                    value={title}
                    onIonChange={(e) => setTitle(e.detail.value!)}
                    required
                    placeholder="Enter event name"
                  />
                </IonItem>

                <IonItem style={{ marginTop: 15 }}>
                  <IonLabel position="stacked">Event Description</IonLabel>
                  <IonTextarea
                    value={description}
                    onIonChange={(e) => setDescription(e.detail.value!)}
                    required
                    placeholder="Describe your event"
                    rows={4}
                  />
                </IonItem>

                <IonItem style={{ marginTop: 15 }}>
                  <IonLabel position="stacked">Event Time</IonLabel>
                  <IonDatetime
                    value={time}
                    onIonChange={(e) => setTime(e.detail.value as string)}
                    presentation="time"
                  />
                </IonItem>

                <IonItem style={{ marginTop: 15 }}>
                  <IonLabel position="stacked">Event Date</IonLabel>
                  <IonDatetime
                    value={date}
                    onIonChange={(e) => setDate(e.detail.value as string)}
                    presentation="date"
                  />
                </IonItem>

                <IonItem style={{ marginTop: 15 }}>
                  <IonLabel position="stacked">Is this a campus event?</IonLabel>
                  <IonSelect
                    value={filter1}
                    onIonChange={(e) => setFilter1(e.detail.value as string)}
                    placeholder="Select filter 1"
                    required
                  >
                    <IonSelectOption value="Gordon College">Yes, this is a campus event.</IonSelectOption>
                    <IonSelectOption value="">No, department exclusive event.</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem style={{ marginTop: 15 }}>
                  <IonLabel position="stacked">Department</IonLabel>
                  <IonSelect
                    value={filter2}
                    onIonChange={(e) => setFilter2(e.detail.value as string)}
                    placeholder="Select filter 2"
                  >
                    <IonSelectOption value="BSCS">BSCS</IonSelectOption>
                    <IonSelectOption value="CBA">CBA</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonButton expand="block" type="submit" style={{ marginTop: 30 }}>
                  Create Event
                </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          color={toastMessage.includes('success') ? 'success' : 'danger'}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default CreateEvent;
