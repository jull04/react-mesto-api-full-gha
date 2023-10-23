import successRegister from "../images/success-register.svg";
import errorRegister from "../images/error-register.svg";

function InfoTooltip ({name, isOpen, onClose, isConfirmed}) {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup__visible" : ""}`}>
      <div className="popup__content">
        <button className="popup__close" type="button" onClick={onClose}/>
        <img 
          className="popup__tooltip-img" 
          alt={isConfirmed ? "Галочка" : "Крестик"}
          src={isConfirmed ? successRegister : errorRegister} 
        />
        <h2 className="popup__tooltip-title">
          {isConfirmed ? "Вы успешно зарегистрировались" : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  ) 
}

export default InfoTooltip