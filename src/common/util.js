export const formatNumber = (number) => {
  return (
    number && number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, " ")
  );
};

export const EVENT_TYPES = {
  BLACK_FRIDAY: "BLACK_FRIDAY",
  CYBER_MONDAY: "CYBER_MONDAY",
};

export const EVENTS = {
  BLACK_FRIDAY: "Black Friday",
  CYBER_MONDAY: "Cyber Monday",
};

export const CONTENT = {
  BLACK_FRIDAY: {
    counterTitle: "Get Ready For The Black Friday Frenzy!",
    counterDescription: "The epic countdown has begun! Brace yourselves for the retail event of the year. The Ecentric Black Friday Dashboard is about to burst into action, bringing you a world of payment insights in just a matter of moments.",
    dashboardTitle: "Welcome to the Ecentric Black Friday Dashboard",
    dashboardDescription: "We're thrilled to have you join us for another exciting day of shopping insights. Get ready to dive into the latest transaction statistics for Black Friday and compare them to last year's records. Our dynamic dashboard offers real-time updates, providing you with a front-row seat to the pulse of in-store and online purchases. For a data-driven shopping experience like no other, let's explore the world of Black Friday together!"
  },
  CYBER_MONDAY: {
    counterTitle: "",
    counterDescription: "Wow, Black Friday was a whirlwind of excitement! But don't let the shopping spree end just yet. Get ready for the next round of excitement as we gear up for Cyber Monday. The countdown is on and the thrill continues. Stay tuned!",
    dashboardTitle: "Welcome to the Ecentric Cyber Monday Dashboard",
    dashboardDescription: "We're thrilled to have you join us for another exciting day of retail insights. Get ready to dive into the latest transaction insights for Cyber Monday and compare them to last year's records. Our dynamic dashboard offers real-time updates, providing you with a front-row seat to the pulse of in-store and online purchases."
  }
};
