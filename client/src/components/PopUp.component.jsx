import Popup from 'reactjs-popup'

const PopUp = ({ isOpen, message, onYes, onNo }) => {
  if (!isOpen) return null
  const handleOverlayClick = (e) => {
    // Prevent clicks on the overlay from closing the modal
    e.stopPropagation()
  }
  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal sm:max-w-sm">
        <div className="modal-content">
          <p>{message}</p>
          <div className="modal-actions">
            <button
              onClick={onYes}
              className="bg-red-500 text-white p-3 
        rounded-lg hover:opacity-95 disabled:opacity-80
        uppercase"
            >
              Yes
            </button>
            <button
              onClick={onNo}
              className="bg-slate-700 text-white p-3 
        rounded-lg hover:opacity-95 disabled:opacity-80
        uppercase"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopUp
