const userTypeValue = {
    ADMIN: 1,
    DOCTOR: 2,
    PATIENT: 3,
};

const userStatusValue = {
    ACTIVE: 1,
    INACTIVE: 2,
    BLOCKED: 3
};

const doctorStatusValue = {
    ACTIVE: 1,
    INACTIVE: 2,
    BLOCKED: 3
};

const appointmentStatusValue = {
    Pending: 1,
    Confirmed: 2,
    Cancelled: 3,
    Completed: 4,
};

module.exports = {
    userTypeValue,
    userStatusValue,
    doctorStatusValue,
    appointmentStatusValue
};