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
} from '@ionic/react';

const CreateEvent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [filter1, setFilter1] = useState('');
  const [filter2, setFilter2] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const eventData = {
      title,
      filter1,
      filter2,
      time,
      date,
      description,
      image: imagePreview || 'assets/default.jpg',
    };

    console.log('Event Data:', eventData);
    // Here you can save the eventData or do whatever you want
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="favicon.png"
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
              <form onSubmit={handleSubmit} style={{ padding: 20, boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)' }}>

                <IonItem>
                  <div style={{ marginTop: 15, flexDirection: 'column'}}>
                    <IonLabel>Upload Event Image</IonLabel>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ marginTop: 8 }}
                    />
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
                    onIonChange={(e) => {
                      const val = e.detail.value;
                      if (typeof val === 'string') setTime(val);
                    }}
                    presentation="time"
                  />
                </IonItem>

                <IonItem style={{ marginTop: 15 }}>
                  <IonLabel position="stacked">Event Date</IonLabel>
                  <IonDatetime
                    value={date}
                    onIonChange={(e) => {
                      const val = e.detail.value;
                      if (typeof val === 'string') setDate(val);
                    }}
                    presentation="date"
                  />
                </IonItem>

                <IonItem style={{ marginTop: 15 }}>
                  <IonLabel position="stacked">Is this a campus event?</IonLabel>
                  <IonSelect
                    value={filter1}
                    onIonChange={(e) => setFilter1(e.detail.value)}
                    placeholder="Select filter 1"
                    required
                  >
                    <IonSelectOption value="Gordon College">Yes, this is a campus event.</IonSelectOption>
                    <IonSelectOption value="">No. this is a department exclusive event.</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonItem style={{ marginTop: 15 }}>
                  <IonLabel position="stacked">Department</IonLabel>
                  <IonSelect
                    value={filter2}
                    onIonChange={(e) => setFilter2(e.detail.value)}
                    placeholder="Select filter 2"
                  >
                    <IonSelectOption value="BSCS">BSCS</IonSelectOption>
                    <IonSelectOption value="CBA">CBA</IonSelectOption>
                  </IonSelect>
                </IonItem>

                <IonButton
                  expand="block"
                  type="submit"
                  style={{ marginTop: 30 }}
                  routerLink="/home"
                >
                  Create Event
                </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CreateEvent;
