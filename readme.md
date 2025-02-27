# Statistical Machine Translation Application

## Overview
This project is a **Statistical Machine Translation (SMT) application** that allows users to translate English text into one of three languages: **German, Hindi, or Spanish**. The application is built using Flask for the backend, Bootstrap for the frontend, and a pre-trained SMT model stored as pickle files.


## How to Run the Application Locally

### **1. Create and Activate a Virtual Environment**
```bash
python3 -m venv venv
source venv/bin/activate  # On macOS/Linux
venv\Scripts\activate    # On Windows
```

### **2. Install Dependencies**
```bash
pip install -r requirements.txt
```

### **3. Run the Flask Application**
```bash
python app.py
```

### **4. Access the Web Interface**
Open your browser and go to:
```
http://127.0.0.1:5000/
```

## Design Choices

### **1. Web Framework & UI**
- Flask is used for handling server-side logic.
- Bootstrap ensures a **clean and responsive UI**.
- JavaScript (AJAX) is used to send translation requests **without reloading the page**.

### **2. Language Model Integration**
- The SMT models are **pre-trained IBM Model 2** stored as **pickle files**.
- Users can choose between three target languages (**German, Hindi, Spanish**).
- A dictionary-based probability lookup approach is used to determine the **most probable translation** for each word.

### **3. Handling User Input**
- The application accepts **free text input**.
- The translation function processes **word-by-word translation** using the probability table.
- If a word **is not found**, it is kept in **original English** to maintain context.


## Challenges Faced
### **1. Finding a Quality Dataset**
- One of the primary challenges was finding a **high-quality dataset** for training the SMT model.
- Ensuring the dataset had accurate translations for multiple languages was crucial for model effectiveness.

### **2. Handling Large Datasets & Memory Overflow**
- Dealing with **high volumes of records per dataset** led to **memory overflow issues**.
- Optimized data loading techniques, such as batch processing and efficient data structures, were used to manage memory effectively.

### **3. Handling Unknown Words**
- Since the SMT model is trained on limited vocabulary, **out-of-vocabulary (OOV) words** were a challenge.

### **4. Model Loading Performance**
- Pickle files can be **large**, causing potential slowdowns.
- To optimize performance, the model is **loaded only once** during application startup.

## Future Improvements
- **Improve Translation Quality**: Implement **phrase-based translation** for better accuracy.
- **Expand Language Support**: Add **more language models** to enhance translation options.
- **Better Error Handling**: Implement **spell checking** and synonyms for unrecognized words.
- **User Authentication**: Allow **personalized translations** based on user preferences.