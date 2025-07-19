function ConfirmOrder(props) {
  const handleConfirm = async () => {};

  return (
    <div className="confirm-order">
      <h2>Confirm Your Order</h2>
      {/* {error && <p className="error">{error}</p>} */}
      <button
        onClick={handleConfirm}
        disabled={isSubmitting}
        className="confirm-button"
      >
        {isSubmitting ? "Confirming..." : "Confirm Order"}
      </button>
    </div>
  );
}

export default ConfirmOrder;
