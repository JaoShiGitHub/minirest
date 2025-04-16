function FullHistory() {
  return (
    <main className="bg-pink-100 h-screen w-screen bg-[rgba(0,0,0,0.55)] absolute top-0 flex justify-center items-center">
      <div className="max-w-[550px]">
        <section className="bg-white py-20 px-10 rounded-3xl shadow-xl">
          <div className="flex justify-between items-end">
            <b className="text-3xl">nkqrfw7ygad</b>
            <p className="text-lg">Status: Order Placed</p>
          </div>
          <div>
            <p>Date: 3/6/2025</p>
            <p>Dining : Delivery</p>
            <p>Payment: mobile babanking </p>
            <p>Request : 100% Sweet please</p>
            <hr />
          </div>
          <b>3 Items</b>
          <div>
            <span>Thai Tea</span>
          </div>
        </section>
        <section className="text-white">
          <button className="bg-[#010617] text-2xl shadow-xl px-20 py-5 rounded-full">
            Close
          </button>
          <button className=" bg-[#D90000] text-2xl shadow-xl px-20 py-5 rounded-full">
            Delete
          </button>
        </section>
      </div>
    </main>
  );
}

export default FullHistory;
