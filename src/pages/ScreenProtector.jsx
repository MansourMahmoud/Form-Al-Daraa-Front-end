import React, { useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import {
  Input,
  Button,
  Typography,
  Menu,
  MenuHandler,
  Textarea,
  Select,
  Option,
  Spinner,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const ScreenProtector = ({ isDarkModeActive }) => {
  const selectTypeScreen = useRef();
  const selectFlatScreens = useRef();
  const selectCurvedScreens = useRef();
  const selectRegion = useRef();

  useEffect(() => {
    // start selectTypeScreen
    selectTypeScreen?.current?.children[0]?.children[0]?.classList?.remove(
      "left-3"
    );
    selectTypeScreen?.current?.children[0]?.children[0]?.classList?.add(
      "right-8"
    );

    selectTypeScreen?.current?.children[0]?.children[1]?.classList?.remove(
      "right-2"
    );
    selectTypeScreen?.current?.children[0]?.children[1]?.classList?.add(
      "left-2"
    );
    // end selectTypeScreen

    // start selectFlatScreens
    selectFlatScreens?.current?.children[0]?.children[0]?.classList?.remove(
      "left-3"
    );
    selectFlatScreens?.current?.children[0]?.children[0]?.classList?.add(
      "right-8"
    );

    selectFlatScreens?.current?.children[0]?.children[1]?.classList?.remove(
      "right-2"
    );
    selectFlatScreens?.current?.children[0]?.children[1]?.classList?.add(
      "left-2"
    );
    // end selectFlatScreens

    // start selectCurvedScreens
    selectCurvedScreens?.current?.children[0]?.children[0]?.classList?.remove(
      "left-3"
    );
    selectCurvedScreens?.current?.children[0]?.children[0]?.classList?.add(
      "right-8"
    );

    selectCurvedScreens?.current?.children[0]?.children[1]?.classList?.remove(
      "right-2"
    );
    selectCurvedScreens?.current?.children[0]?.children[1]?.classList?.add(
      "left-2"
    );
    // end selectCurvedScreens

    // start selectRegion
    selectRegion?.current?.children[0]?.children[0]?.classList?.remove(
      "left-3"
    );
    selectRegion?.current?.children[0]?.children[0]?.classList?.add("right-8");

    selectRegion?.current?.children[0]?.children[1]?.classList?.remove(
      "right-2"
    );
    selectRegion?.current?.children[0]?.children[1]?.classList?.add("left-2");
    // end selectRegion
  }, []);
  const myFrom = useRef(null);
  const [message, setMessage] = useState({
    fullName: "",
    phone: "",
    email: "",
    screenProtector: "",
    flatScreensProducts: "",
    flatScreensnumberOfProducts: "1",
    curvedScreensProducts: "",
    curvedScreensNumberOfProducts: "1",
    region: "",
    city: "",
    locationDetails: "",
  });

  const [formLoading, setFormLoading] = useState(false);

  const handleMessage = async (ev) => {
    ev.preventDefault();

    const {
      fullName,
      phone,
      email,
      screenProtector,
      flatScreensProducts,
      flatScreensnumberOfProducts,
      curvedScreensProducts,
      curvedScreensNumberOfProducts,
      region,
      city,
      locationDetails,
    } = message;

    const isEmailValid = (email) => {
      // ريجيولر إكسبريشن للتحقق من صحة الإيميل
      const emailRegex = /^[a-z0-9](\.?[a-z0-9]){5,}@(gmail|yahoo)\.com$/;
      return emailRegex.test(email);
    };

    const emailIsValid = isEmailValid(email);
    const isSaudiPhoneNumberValid = (phoneNumber) => {
      // ريجيولر إكسبريشن للتحقق من صحة رقم الهاتف السعودي
      const saudiPhoneNumberRegex =
        /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
      return saudiPhoneNumberRegex.test(phoneNumber);
    };
    // في داخل دالة handleMessage
    const phoneNumberIsValid = isSaudiPhoneNumberValid(phone);

    if (fullName === "") {
      return toast.error("تأكد من كتابة اسمك");
    } else if (!phoneNumberIsValid) {
      return toast.error(
        "خطأ في رقم الهاتف: تأكد أنك تكتب رقم الهاتف بشكل صحيح وبدون مسافات مسبوقا برمز البلد"
      );
    } else if (!emailIsValid) {
      return toast.error("رجاء اكتب إيميلك بشكل صحيح");
    } else if (screenProtector === "") {
      return toast.error("تأكد من إختيار حامي الشاشات هل هو مسطح أم منحني؟");
    } else if (screenProtector === "واقيات شاشات مسطحة") {
      if (flatScreensProducts === "") {
        return toast.error(
          "تأكد من إختيار منتج من منتجات واقيات الشاشات المسطحة"
        );
      } else if (
        flatScreensnumberOfProducts === "" ||
        flatScreensnumberOfProducts <= 0
      ) {
        return toast.error(
          "رجاء اخبرنا كم عدد المنتج الذي تريده من منتجات واقيات الشاشات المسطحة؟ علي سبيل المثال 1/2/3 ، لا يمكن ان يكون العدد 0 او سالب"
        );
      } else if (region === "") {
        return toast.error("رجاء اكتب منطقتك");
      } else if (city === "") {
        return toast.error("رجاء اكتب مدينتك");
      } else if (locationDetails === "") {
        return toast.error(
          " رجاء اكتب تفاصيل موقعك بشكل صحيح حتي يسهل علينا الوصول إليك!"
        );
      } else {
        try {
          setFormLoading(true);

          // استخدام toast.promise للإشعارات
          await toast.promise(
            axios.post("http://localhost:3001/send", message),
            {
              loading: "برجاء الانتظار قليلا جاري ارسال رسالتك...",
              success: (res) => {
                setMessage({
                  fullName: "",
                  phone: "",
                  email: "",
                  screenProtector: "",
                  flatScreensProducts: "",
                  flatScreensnumberOfProducts: "1",
                  curvedScreensProducts: "",
                  curvedScreensNumberOfProducts: "1",
                  region: "",
                  city: "",
                  locationDetails: "",
                });
                return `${res.data.message}`;
              },

              error: (error) => {
                console.error(error);
                return (
                  `${error.response?.data?.message}` ||
                  "فشل ارسال الرسالة.. رجاء حاول مرة أخري"
                );
              },
            }
          );
        } finally {
          setFormLoading(false);
        }
      }
    } else if (screenProtector === "واقيات شاشات منحنية") {
      if (curvedScreensProducts === "") {
        return toast.error(
          "تأكد من إختيار منتج من منتجات واقيات الشاشات المنحنية"
        );
      } else if (
        curvedScreensNumberOfProducts === "" ||
        curvedScreensNumberOfProducts <= 0
      ) {
        return toast.error(
          "رجاء اخبرنا كم عدد المنتج الذي تريده من منتجات واقيات الشاشات المنحنية علي سبيل المثال 1/2/3 ، لا يمكن ان يكون العدد 0 او سالب"
        );
      } else if (region === "") {
        return toast.error("رجاء اكتب منطقتك");
      } else if (city === "") {
        return toast.error("رجاء اكتب مدينتك");
      } else if (locationDetails === "") {
        return toast.error(
          " رجاء اكتب تفاصيل موقعك بشكل صحيح حتي يسهل علينا الوصول إليك!"
        );
      } else {
        try {
          setFormLoading(true);

          // استخدام toast.promise للإشعارات
          await toast.promise(
            axios.post("http://localhost:3001/send", message),
            {
              loading: "برجاء الانتظار قليلا جاري ارسال رسالتك...",
              success: (res) => {
                setMessage({
                  fullName: "",
                  phone: "",
                  email: "",
                  screenProtector: "",
                  flatScreensProducts: "",
                  flatScreensnumberOfProducts: "1",
                  curvedScreensProducts: "",
                  curvedScreensNumberOfProducts: "1",
                  region: "",
                  city: "",
                  locationDetails: "",
                });
                return `${res.data.message}`;
              },
              error: (error) => {
                console.error(error);
                return (
                  `${error.response?.data?.message}` ||
                  "فشل ارسال الرسالة.. رجاء حاول مرة أخري"
                );
              },
            }
          );
        } finally {
          setFormLoading(false);
        }
      }
    }
  };

  const typographyStyle = "-mb-3 dark-text";
  const inputStyle = "placeholder:text-gray-200 dark-text";
  const fieldStyle = "flex flex-col gap-5";

  const flatScreensList = [
    "واقي شاشة 98 بوصة (680 ريال)",
    "واقي شاشة 86 بوصة (425 ريال)",
    "واقي شاشة 85 بوصة (415 ريال)",
    "واقي شاشة 82 بوصة (395 ريال)",
    "واقي شاشة 75 بوصة (325 ريال)",
    "واقي شاشة 70 بوصة (290 ريال)",
    "واقي شاشة 65 بوصة (275 ريال)",
    "واقي شاشة 60 بوصة (255 ريال)",
    "واقي شاشة 58 بوصة (235 ريال)",
    "واقي شاشة 55 بوصة (175 ريال)",
    "واقي شاشة 50 بوصة (155 ريال)",
    "واقي شاشة 49 بوصة (140 ريال)",
    "واقي شاشة 48 بوصة (130 ريال)",
    "واقي شاشة 46 بوصة (125 ريال)",
    "واقي شاشة 43 بوصة (120 ريال)",
    "واقي شاشة 42 بوصة (115 ريال)",
    "واقي شاشة 40 بوصة (90 ريال)",
    "واقي شاشة 39 بوصة (85 ريال)",
    "واقي شاشة 32 بوصة (75 ريال)",
    "واقي شاشة 27 بوصة (65 ريال)",
  ];

  const curvedScreensList = [
    "واقي شاشة 98 بوصة (700 ريال)",
    "واقي شاشة 86 بوصة (445 ريال)",
    "واقي شاشة 85 بوصة (435 ريال)",
    "واقي شاشة 82 بوصة (415 ريال)",
    "واقي شاشة 75 بوصة (345 ريال)",
    "واقي شاشة 70 بوصة (310 ريال)",
    "واقي شاشة 65 بوصة (295 ريال)",
    "واقي شاشة 60 بوصة (275 ريال)",
    "واقي شاشة 58 بوصة (255 ريال)",
    "واقي شاشة 55 بوصة (195 ريال)",
    "واقي شاشة 50 بوصة (175 ريال)",
    "واقي شاشة 49 بوصة (160 ريال)",
    "واقي شاشة 48 بوصة (150 ريال)",
    "واقي شاشة 46 بوصة (145 ريال)",
    "واقي شاشة 43 بوصة (140 ريال)",
    "واقي شاشة 42 بوصة (135 ريال)",
    "واقي شاشة 40 بوصة (110 ريال)",
    "واقي شاشة 39 بوصة (105 ريال)",
    "واقي شاشة 32 بوصة (95 ريال)",
    "واقي شاشة 27 بوصة (85 ريال)",
  ];

  const saudiRigion = [
    "الرياض",
    "الشرقية",
    "مكة",
    "المدينة المنورة",
    "الشرقية",
    "القصيم",
    "حائل",
    "تبوك",
    "الحدود الشمالية",
    "جازان",
    "نجران",
    "الباحة",
    "الجوف",
    "عسير",
  ];

  return (
    <Container className="min-h-screen flex flex-col gap-8">
      <div>
        <Link to={`https://sa.al-daraa.com`} target="_blank">
          <Button
            variant={isDarkModeActive ? "outlined" : ""}
            className="dark:text-darkMode-dark50 dark:border-white bg-[#9fdcff] text-[#001736] dark:bg-inherit"
          >
            اذهب إلى متجرنا
          </Button>
        </Link>
      </div>
      {/* <!-- Right column container with form --> */}
      <div className="flex flex-col items-center gap-5 ">
        <p className="md:w-[80%] lg:w-[50%] dark:text-darkMode-dark50 mb-5 text-center text-lg font-bold tracking-wide">
          أهلا وسهلا بك في نموذج طلب شراء حامي شاشة التلفاز. سيساعدك هذا النموذج
          في اختيار المنتج المناسب لك
        </p>
        <form
          ref={myFrom}
          onSubmit={handleMessage}
          className="flex flex-col gap-2 w-full md:w-[80%] lg:w-[55%] shadow shadow-gray-500 dark:shadow-darkMode-dark50 p-10"
        >
          {/* <!-- full name --> */}
          <div className={`${fieldStyle}`}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              الإسم الكامل
            </Typography>
            <Input
              color={isDarkModeActive ? "green" : "gray"}
              label="الاسم الأول والأخير"
              className={`${inputStyle}`}
              value={message.fullName}
              onChange={(ev) =>
                setMessage({ ...message, fullName: ev.target.value })
              }
              name="name"
            />
          </div>

          {/* <!-- phone  --> */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              رقم الهاتف
            </Typography>
            <div className="relative flex">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    className="dark-text cursor-default flex h-10 items-center gap-2 rounded-l-none border border-l-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg"
                      alt="flag-for-egypt"
                      className="h-4 w-4 rounded-full object-cover"
                    />
                  </Button>
                </MenuHandler>
              </Menu>
              <Input
                type="tel"
                className={`rounded-r-none ${inputStyle} `}
                color={isDarkModeActive ? "green" : "gray"}
                label="رقم التليفون"
                value={message.phone}
                onChange={(ev) =>
                  setMessage({ ...message, phone: ev.target.value })
                }
                name="phone"
              />
            </div>
          </div>

          {/* <!-- email --> */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              البريد الإلكتروني
            </Typography>
            <Input
              color={isDarkModeActive ? "green" : "gray"}
              label="البريد الإلكتروني"
              className={`${inputStyle}`}
              value={message.email}
              onChange={(ev) =>
                setMessage({ ...message, email: ev.target.value })
              }
              name="email"
            />
          </div>

          {/* حامي الشاشات */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              نوع حامي الشاشة
            </Typography>

            <Select
              ref={selectTypeScreen}
              color={isDarkModeActive ? "green" : "black"}
              label="إختر نوع حامي الشاشة"
              className="dark:text-darkMode-dark50"
              labelProps={{
                className: "text-[0.875rem]",
              }}
              value={message.screenProtector}
              onChange={(value) => {
                setMessage({ ...message, screenProtector: value });
              }}
              onClick={() => {
                setTimeout(() => {
                  selectTypeScreen?.current?.children[0]?.children[1]?.classList?.remove(
                    "right-2"
                  );
                  selectTypeScreen?.current?.children[0]?.children[1]?.classList?.add(
                    "left-2"
                  );
                }, 1);
              }}
              name="screenProtector"
            >
              <Option
                className="text-lg tracking-wide"
                value="واقيات شاشات مسطحة"
              >
                واقيات شاشات مسطحة
              </Option>
              <Option
                className="text-lg tracking-wide"
                value="واقيات شاشات منحنية"
              >
                واقيات شاشات منحنية
              </Option>
            </Select>
          </div>

          {/* <!-- منتجات واقيات الشاشات المسطحة --> */}
          <div
            className={`duration-500 transition-all ${
              message.screenProtector === ""
                ? "hidden"
                : message.screenProtector === "واقيات شاشات مسطحة"
                ? "flex flex-col gap-5"
                : "hidden"
            }`}
          >
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              منتجات واقيات الشاشات المسطحة
            </Typography>
            <div className=" grid  grid-cols-1 sm:grid-cols-2 flex-wrap gap-2 w-full">
              <div className="">
                <Select
                  ref={selectFlatScreens}
                  color={isDarkModeActive ? "green" : "black"}
                  label="إختر المنتج"
                  className=" dark:text-darkMode-dark50"
                  labelProps={{
                    className: "text-[0.875rem]",
                  }}
                  value={message.flatScreensProducts}
                  onChange={(value) =>
                    setMessage({ ...message, flatScreensProducts: value })
                  }
                  onClick={() => {
                    setTimeout(() => {
                      selectFlatScreens?.current?.children[0]?.children[1]?.classList?.remove(
                        "right-2"
                      );
                      selectFlatScreens?.current?.children[0]?.children[1]?.classList?.add(
                        "left-2"
                      );
                    }, 1);
                  }}
                  name="flatScreensProducts"
                >
                  {flatScreensList?.map((item, index) => (
                    <Option
                      className="text-lg tracking-wide"
                      key={index}
                      value={item}
                    >
                      {item}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="">
                <Input
                  color={isDarkModeActive ? "green" : "deep-purple"}
                  label="ادخل عدد المنتج الذي تريده"
                  className={`${inputStyle}`}
                  value={message.flatScreensnumberOfProducts}
                  onChange={(ev) =>
                    setMessage({
                      ...message,
                      flatScreensnumberOfProducts: ev.target.value,
                    })
                  }
                  type="number"
                  name="flatScreensnumberOfProducts"
                />
              </div>
            </div>
          </div>
          {/* end */}

          {/* <!-- منتجات واقيات الشاشات المنحنية --> */}
          <div
            className={`duration-500 transition-all ${
              message.screenProtector === ""
                ? "hidden"
                : message.screenProtector === "واقيات شاشات منحنية"
                ? "flex flex-col gap-5"
                : "hidden"
            }`}
          >
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              منتجات واقيات الشاشات المنحنية
            </Typography>
            <div className=" grid  grid-cols-1 sm:grid-cols-2 flex-wrap gap-2 w-full">
              <div className="">
                <Select
                  ref={selectCurvedScreens}
                  color={isDarkModeActive ? "green" : "black"}
                  label="إختر المنتج"
                  className=" dark:text-darkMode-dark50"
                  labelProps={{
                    className: "text-[0.875rem]",
                  }}
                  value={message.curvedScreensProducts}
                  onChange={(value) =>
                    setMessage({ ...message, curvedScreensProducts: value })
                  }
                  onClick={() => {
                    setTimeout(() => {
                      selectCurvedScreens?.current?.children[0]?.children[1]?.classList?.remove(
                        "right-2"
                      );
                      selectCurvedScreens?.current?.children[0]?.children[1]?.classList?.add(
                        "left-2"
                      );
                    }, 1);
                  }}
                  name="curvedScreensProducts"
                >
                  {curvedScreensList?.map((item, index) => (
                    <Option
                      className="text-lg tracking-wide"
                      key={index}
                      value={item}
                    >
                      {item}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="">
                <Input
                  color={isDarkModeActive ? "green" : "deep-purple"}
                  label="ادخل عدد المنتج الذي تريده"
                  className={`${inputStyle}`}
                  value={message.curvedScreensNumberOfProducts}
                  onChange={(ev) =>
                    setMessage({
                      ...message,
                      curvedScreensNumberOfProducts: ev.target.value,
                    })
                  }
                  type="number"
                  name="curvedScreensNumberOfProducts"
                />
              </div>
            </div>
          </div>
          {/* end */}

          {/* <!-- region --> */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              ما هي منطقتك؟
            </Typography>

            <Select
              ref={selectRegion}
              color={isDarkModeActive ? "green" : "black"}
              label="اختر المنطقة"
              className=" dark:text-darkMode-dark50"
              labelProps={{
                className: "text-[0.875rem]",
              }}
              value={message.region}
              onChange={(value) => setMessage({ ...message, region: value })}
              onClick={() => {
                setTimeout(() => {
                  selectRegion?.current?.children[0]?.children[1]?.classList?.remove(
                    "right-2"
                  );
                  selectRegion?.current?.children[0]?.children[1]?.classList?.add(
                    "left-2"
                  );
                }, 1);
              }}
              name="flatScreensProducts"
            >
              {saudiRigion?.map((item, index) => (
                <Option
                  className="text-lg tracking-wide"
                  key={index}
                  value={item}
                >
                  {item}
                </Option>
              ))}
            </Select>
          </div>

          {/* <!-- city --> */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              ما هي مدينتك؟
            </Typography>
            <Input
              color={isDarkModeActive ? "green" : "gray"}
              label="المدينة _ الحي"
              className={inputStyle}
              value={message.city}
              onChange={(ev) =>
                setMessage({
                  ...message,
                  city: ev.target.value,
                })
              }
              name="city"
            />
          </div>

          {/* <!-- location details --> */}
          <div className={fieldStyle}>
            <Typography
              variant="h6"
              color="blue-gray"
              className={typographyStyle}
            >
              أدخل تفاصيل موقعك
            </Typography>
            <Textarea
              color={isDarkModeActive ? "green" : "gray"}
              size="lg"
              label="تفاصيل موقعك"
              className="mb-6 dark:text-darkMode-dark50"
              value={message.locationDetails}
              onChange={(ev) =>
                setMessage({
                  ...message,
                  locationDetails: ev.target.value,
                })
              }
              labelProps={{
                className: " text-white",
              }}
              name="locationDetails"
            ></Textarea>
          </div>
          {/* end */}

          {/* <!-- Submit button --> */}
          <Button
            type="submit"
            variant={isDarkModeActive ? "outlined" : ""}
            className="dark:text-darkMode-dark50 dark:border-white text-xl bg-[#9fdcff] text-[#001736] dark:bg-inherit"
          >
            {formLoading ? (
              <div className="flex justify-center ">
                <Spinner className="h-6 w-6" />
              </div>
            ) : (
              "إرسال"
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ScreenProtector;
