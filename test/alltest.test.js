const User = require("../js/user");
jest.mock("../js/user"); // SoundPlayer is now a mock constructor

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    User.mockClear();
});

it('We can check if the consumer called the class constructor', () => {
    //const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(User).toHaveBeenCalledTimes(1);
});

