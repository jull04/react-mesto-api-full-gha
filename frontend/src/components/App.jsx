import React, { useEffect, useState } from "react";
import {Route, Routes, useNavigate, Navigate} from "react-router-dom";
import Header from "./Header.jsx";
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from "./ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import DeletePopupCard from "./DeleteCardPopup.jsx";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import {register, authorize, checkToken} from "../utils/auth.js"

function App() {

  const [isEditProfilePopupOpen, setEditPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isDeletePopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState("");

  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isSuccessInfoTooltipStatus, setSuccessInfoTooltipStatus] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfo(localStorage.jwt), api.getCards(localStorage.jwt)])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser);
        setCards(dataCard);
      }) 
      .catch((error => console.log(`Ошибка ${error}`)))
    }
  }, [loggedIn])

  // Проверка токена при загрузке страницы
  useEffect(() => {
    // если у пользователя есть токен в localStorage, 
    // функция проверит, действующий он или нет
    if (localStorage.jwt) {
      checkToken(localStorage.jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            navigate('/', {replace: true})
          }
        })
        .catch((error => console.log(`Ошибка проверки токена ${error}`)))
    }
  }, [navigate]);

  //Обработка запроса на регистрацию
  function handleRegister(email, password) {
    register(email, password)
    .then((res) => {
      if (res) {
        setSuccessInfoTooltipStatus(true);
        navigate('/sign-in', {replace: true});
      } else {
        setSuccessInfoTooltipStatus(false);
      }
    })
    .catch((error) => {
      setSuccessInfoTooltipStatus(false);
      console.log(`Ошибка регистрации ${error}`);
    })
    .finally(() => openInfoTooltip());
  }

  //Изменение статуса логина
  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function openInfoTooltip() {
    setInfoTooltipOpen(true);
  }

  //Обработка запроса на авторизацию
  function handleLogin(email, password) {
    authorize(email, password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        setEmail(email);
        handleLoggedIn();
        navigate('/', {replace: true})
      }
    })
    .catch((error) => {
      openInfoTooltip()
      setLoggedIn(false);
      setSuccessInfoTooltipStatus(false)
      console.log(`Ошибка авторизации ${error}`);
    })
  }

  //Выход из системы
  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setEmail("");
  }

  function handleEditProfileClick() {
    setEditPopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPopupOpen(true)
  }

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleDeleteCard(cardId) {
    setDeleteCardPopupOpen(true);  
    setDeleteCardId(cardId) 
  }

  function closeAllPopups() { 
    setEditPopupOpen(false)
    setAvatarPopupOpen(false)
    setAddPopupOpen(false)
    setDeleteCardPopupOpen(false)
    setImagePopupOpen(false)
    setInfoTooltipOpen(false)
  }

  function handleCardLike (card) {
    const isLike = card.likes.some((element) => currentUser._id === element._id);
    if (isLike) {
      api.deleteLike(card._id, localStorage.jwt)
      .then((res) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? res : c))
        )
      })
      .catch(error => console.log(`Ошибка снятия лайка ${error}`));
    } else {
      api.putLike(card._id, localStorage.jwt)
      .then((res) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? res : c))
        )
      })
      .catch(error => console.log(`Ошибка постановки лайка ${error}`)); 
    }
  }

  function handleDeleteSubmit() {
    api.deleteCard(deleteCardId, localStorage.jwt)
    .then(() => {
      setCards((state) =>
        state.filter((card) => {
          return card._id !== deleteCardId;
        })
      );
      closeAllPopups();
    })
    .catch((error => console.error(`Ошибка удаления карточки ${error}`))) 
    .finally(() => setIsLoading(false))
    setIsLoading(true)
  }

  function handleUpdateUser(dataUser, reset) {
    api.setUserInfo(dataUser, localStorage.jwt)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups()
      reset()
    })
    .catch((error) => console.log(`Ошибка редактирования профиля ${error}`))
    .finally(() => setIsLoading(false))
    setIsLoading(true)
  }

  function handleUpdateAvatar(dataUser, reset){
    api.setAvatar(dataUser, localStorage.jwt)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups()
      reset()
    })
    .catch((error) => console.log(`Ошибка обновления аватара ${error}`))
    .finally(() => setIsLoading(false))
    setIsLoading(true)
  }

  function handleAddPlace(cardInfo, reset){
    api.addCard(cardInfo, localStorage.jwt)
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups()
      reset()
    })
    .catch((error) => console.log(`Ошибка добавления карточки ${error}`))
    .finally(() => setIsLoading(false))
    setIsLoading(true)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header loggedIn={loggedIn} onLogout={handleLogout} email={email}/>
        <Routes>
          <Route path="/sign-up" element={<Register onRegister={handleRegister}/>}/>
          <Route path="/sign-in" element={<Login onLogin={handleLogin}/>}/>
          <Route path="*" element={<Navigate to={loggedIn ? "/" : "/sign-in"} />} />
          <Route
            path="/"
            element={<ProtectedRouteElement 
              loggedIn={loggedIn} 
              element={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onDeleteCard={handleDeleteCard}
              onCardLike={handleCardLike}
              cards={cards}
            />} 
          />
        </Routes>
        <Footer/>
        <InfoTooltip
          name="info"
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isConfirmed={isSuccessInfoTooltipStatus}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        /> 
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}  
          onUpdateUser={handleUpdateUser} 
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <DeletePopupCard
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleDeleteSubmit}
          isLoading={isLoading}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;