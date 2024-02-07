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
  Checkbox,
  ListItemPrefix,
  ListItem,
  List,
  Card,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const ScreenProtector = ({ isDarkModeActive }) => {
  const selectTypeScreen = useRef();
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
    region: "",
    city: "",
    locationDetails: "",
  });

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

  const checkConditions = (arr) => {
    // التحقق من أن جميع العناصر تحتوي على isChecked === false
    const allUnchecked = arr.every((item) => item.isChecked === false);

    if (allUnchecked) {
      return false;
    } else {
      // التحقق من أن جميع العناصر التي isChecked === true لديها num > 1
      const allCheckedWithNumGreaterOne = arr
        ?.filter((item) => item.isChecked === true)
        .every((item) => item.num >= 1);

      return allCheckedWithNumGreaterOne;
    }
  };

  const [flatScreensProductsSend, setFlatScreensProductsSend] = useState([]);
  const [curvedScreensProductsSend, setCurvedScreensProductsSend] = useState(
    []
  );

  useEffect(() => {
    const flatScreensData =
      flatScreensList.length > 0 &&
      flatScreensList.map((item, index) => {
        return {
          productName: item,
          isChecked: false,
          num: "1",
        };
      });
    setFlatScreensProductsSend(flatScreensData.length > 0 && flatScreensData);
  }, [flatScreensList]);
  useEffect(() => {
    const curvedScreensData =
      curvedScreensList.length > 0 &&
      curvedScreensList.map((item, index) => {
        return {
          productName: item,
          isChecked: false,
          num: "1",
        };
      });
    setCurvedScreensProductsSend(
      curvedScreensData.length > 0 && curvedScreensData
    );
  }, [curvedScreensList]);

  const [formLoading, setFormLoading] = useState(false);

  const handleMessage = async (ev) => {
    ev.preventDefault();

    const {
      fullName,
      phone,
      email,
      screenProtector,
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
      if (!checkConditions(flatScreensProductsSend)) {
        return toast.error(
          "تأكد من إختيار منتج من منتجات واقيات الشاشات المسطحة، بالإضافة إلى التحقق من العدد. يجب أن لا يكون العدد أقل من 1 لأي من المنتجات المختارة"
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
      if (!checkConditions(curvedScreensProductsSend)) {
        return toast.error(
          "تأكد من إختيار منتج من منتجات واقيات الشاشات المنحنية، بالإضافة إلى التحقق من العدد. يجب أن لا يكون العدد أقل من 1 لأي من المنتجات المختارة"
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
      <div className="flex items-center gap-2 flex-wrap">
        <Link to={`https://sa.al-daraa.com`} target="_blank">
          <Button
            variant={isDarkModeActive ? "outlined" : ""}
            className="dark:text-darkMode-dark50 text-base p-2 dark:border-white bg-[#9fdcff] text-[#001736] dark:bg-inherit"
          >
            اذهب إلى متجرنا
          </Button>
        </Link>
        <Link to={`/packages-deals`}>
          <Button className="dark:text-darkMode-dark800 text-base p-2 dark:border-white bg-gradient-to-tl from-red-900 to-purple-500 dark:from-red-500 dark:to-darkMode-dark50  dark:bg-inherit dark:hover:bg-darkMode-dark50 duration-300 transition-all">
            تعـرف علـي آخـر العـروض
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
          className="flex flex-col gap-2 w-full md:w-[80%] lg:w-[75%] shadow shadow-gray-500 dark:shadow-darkMode-dark50 p-10"
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
              منتجات واقيات الشاشات المسطحة (اختر واحدة علي الأقل)
            </Typography>

            <Card className="bg-inherit">
              <List className="flex flex-col gap-2">
                {flatScreensProductsSend?.map((item, index) => (
                  <div
                    className={`flex flex-col lg:flex-row lg:justify-between p-2 gap-2 ${
                      index === flatScreensProductsSend?.length - 1
                        ? ""
                        : " border-b-[2px] border-gray-300"
                    }`}
                    key={index}
                  >
                    <ListItem className="p-0">
                      <label
                        htmlFor={item?.productName}
                        className="flex w-full cursor-pointer items-center px-3 py-2 gap-3 group "
                      >
                        <ListItemPrefix className="mr-3">
                          <Checkbox
                            color="blue"
                            id={item?.productName}
                            ripple={false}
                            className="hover:before:opacity-0 dark:border-darkMode-dark50 dark:group-hover:border-darkMode-dark900"
                            containerProps={{
                              className: "p-0",
                            }}
                            checked={item?.isChecked}
                            onChange={(ev) => {
                              const isChecked = ev.target.checked;
                              const existingIndex =
                                flatScreensProductsSend.findIndex(
                                  (p) => p.productName === item?.productName
                                );

                              if (existingIndex !== -1) {
                                // إذا وجد العنصر، نقوم بتحديث حالته
                                const updatedFlatScreensProductsSend = [
                                  ...flatScreensProductsSend,
                                ];
                                updatedFlatScreensProductsSend[existingIndex] =
                                  {
                                    ...item,
                                    isChecked,
                                  };
                                setFlatScreensProductsSend(
                                  updatedFlatScreensProductsSend
                                );
                              } else {
                                // إذا لم يجد العنصر، نقوم بإضافته
                                setFlatScreensProductsSend([
                                  ...flatScreensProductsSend,
                                  {
                                    ...item,
                                    isChecked,
                                  },
                                ]);
                              }
                            }}
                          />
                        </ListItemPrefix>
                        <Typography
                          color="blue-gray"
                          className="font-medium dark:text-darkMode-dark50 dark:group-hover:text-darkMode-dark900"
                        >
                          {item?.productName}
                        </Typography>
                      </label>
                    </ListItem>
                    <div className="flex justify-end items-center lg:justify-start">
                      {item.isChecked === true && (
                        <input
                          type="number"
                          value={item?.num}
                          onChange={(ev) => {
                            const num = ev.target.value;
                            const existingIndex =
                              flatScreensProductsSend.findIndex(
                                (p) => p.productName === item?.productName
                              );

                            if (existingIndex !== -1) {
                              // إذا وجد العنصر، نقوم بتحديث حالته
                              const updatedFlatScreensProductsSend = [
                                ...flatScreensProductsSend,
                              ];
                              updatedFlatScreensProductsSend[existingIndex] = {
                                ...item,
                                num,
                              };
                              setFlatScreensProductsSend(
                                updatedFlatScreensProductsSend
                              );
                            } else {
                              // إذا لم يجد العنصر، نقوم بإضافته
                              setFlatScreensProductsSend([
                                ...flatScreensProductsSend,
                                {
                                  ...item,
                                  num,
                                },
                              ]);
                            }
                          }}
                          placeholder="عدد المنتج الذي تريده"
                          className="rounded-md text-center font-bold w-fit py-1 focus:outline-none"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </List>
            </Card>
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
              منتجات واقيات الشاشات المنحنية (اختر واحدة علي الأقل)
            </Typography>

            <Card className="bg-inherit">
              <List className="flex flex-col gap-2">
                {curvedScreensProductsSend?.map((item, index) => (
                  <div
                    className={`flex flex-col lg:flex-row lg:justify-between p-2 gap-2 ${
                      index === curvedScreensProductsSend?.length - 1
                        ? ""
                        : " border-b-[2px] border-gray-300"
                    }`}
                    key={index}
                  >
                    <ListItem className="p-0">
                      <label
                        htmlFor={item?.productName}
                        className="flex w-full cursor-pointer items-center px-3 py-2 gap-3 group "
                      >
                        <ListItemPrefix className="mr-3">
                          <Checkbox
                            color="blue"
                            id={item?.productName}
                            ripple={false}
                            className="hover:before:opacity-0 dark:border-darkMode-dark50 dark:group-hover:border-darkMode-dark900"
                            containerProps={{
                              className: "p-0",
                            }}
                            checked={item?.isChecked}
                            onChange={(ev) => {
                              const isChecked = ev.target.checked;
                              const existingIndex =
                                curvedScreensProductsSend.findIndex(
                                  (p) => p.productName === item?.productName
                                );

                              if (existingIndex !== -1) {
                                // إذا وجد العنصر، نقوم بتحديث حالته
                                const updatedCurvedScreensProductsSend = [
                                  ...curvedScreensProductsSend,
                                ];
                                updatedCurvedScreensProductsSend[
                                  existingIndex
                                ] = {
                                  ...item,
                                  isChecked,
                                };
                                setCurvedScreensProductsSend(
                                  updatedCurvedScreensProductsSend
                                );
                              } else {
                                // إذا لم يجد العنصر، نقوم بإضافته
                                setCurvedScreensProductsSend([
                                  ...curvedScreensProductsSend,
                                  {
                                    ...item,
                                    isChecked,
                                  },
                                ]);
                              }
                            }}
                          />
                        </ListItemPrefix>
                        <Typography
                          color="blue-gray"
                          className="font-medium dark:text-darkMode-dark50 dark:group-hover:text-darkMode-dark900"
                        >
                          {item?.productName}
                        </Typography>
                      </label>
                    </ListItem>
                    <div className="flex justify-end items-center lg:justify-start">
                      {item.isChecked === true && (
                        <input
                          type="number"
                          value={item?.num}
                          onChange={(ev) => {
                            const num = ev.target.value;
                            const existingIndex =
                              curvedScreensProductsSend.findIndex(
                                (p) => p.productName === item?.productName
                              );

                            if (existingIndex !== -1) {
                              // إذا وجد العنصر، نقوم بتحديث حالته
                              const updatedCurvedScreensProductsSend = [
                                ...curvedScreensProductsSend,
                              ];
                              updatedCurvedScreensProductsSend[existingIndex] =
                                {
                                  ...item,
                                  num,
                                };
                              setCurvedScreensProductsSend(
                                updatedCurvedScreensProductsSend
                              );
                            } else {
                              // إذا لم يجد العنصر، نقوم بإضافته
                              setCurvedScreensProductsSend([
                                ...curvedScreensProductsSend,
                                {
                                  ...item,
                                  num,
                                },
                              ]);
                            }
                          }}
                          placeholder="عدد المنتج الذي تريده"
                          className="rounded-md text-center font-bold w-fit py-1 focus:outline-none"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </List>
            </Card>
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
