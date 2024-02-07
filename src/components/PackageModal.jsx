import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
// Initialization for ES Users
import { Lightbox, initTE } from "tw-elements";
import { IoClose } from "react-icons/io5";

const PackageModal = ({ packageItem, open, setOpen }) => {
  const handleOpen = () => setOpen(!open);
  initTE({ Lightbox });

  return (
    <>
      <Dialog className="dark:bg-darkMode-dark800 relative" open={open}>
        <span
          onClick={handleOpen}
          className="absolute top-0 right-0 text-xl cursor-pointer duration-200 hover:bg-deep-orange-800 hover:text-darkMode-dark50 text-darkMode-dark900 shadow-md shadow-gray-800 bg-cyan-500 px-3 py-2 rounded-ee-full"
        >
          <IoClose />
        </span>
        <DialogHeader
          style={{ backgroundColor: `${packageItem?.color}` }}
          className="flex justify-center mt-5 mb-8 tracking-wider text-4xl shadow-md dark:shadow-white"
        >
          {packageItem?.packageName}
        </DialogHeader>

        <DialogBody className="h-[30rem] overflow-auto flex flex-col gap-5 text-darkMode-dark800 dark:text-darkMode-dark50 text-xl font-bold">
          <div
            data-te-lightbox-init
            className="flex gap-2 justify-center items-center w-full flex-wrap"
          >
            {packageItem?.imagesData?.map(({ imageLink, descAlt }, index) => (
              <div
                key={index}
                className="flex justify-center cursor-zoom-in rounded-lg relative max-w-xs overflow-hidden bg-cover bg-no-repeat"
              >
                <img
                  className="h-32 max-w-full rounded-lg object-cover object-center md:h-50 transition duration-200 ease-in-out hover:scale-110"
                  src={imageLink}
                  data-te-img={imageLink}
                  alt={descAlt}
                />
              </div>
            ))}
          </div>

          <p>
            الباقة تحتوي علي :{" "}
            <span className="text-green-600 tracking-wide">
              {packageItem?.packageContent}
            </span>
          </p>
          <div className="flex items-center">
            <p className="w-1/2">
              مزودة بعدد :{" "}
              <span className="text-green-600 tracking-wide">
                {packageItem?.numOfEntrances}
              </span>{" "}
              مداخل جهاز{" "}
              <span className="text-green-600 tracking-wide">
                {packageItem?.typeOfEntrances}
              </span>
            </p>
            <p className="w-1/2">
              بمساحة :{" "}
              <span className="text-green-600 tracking-wide">
                {packageItem?.hardDriveSpace}
              </span>
            </p>
          </div>

          {/* start */}
          <div className="flex items-center">
            <p className="w-1/2">
              مزودة بعدد :{" "}
              <span className="text-green-600 tracking-wide">
                {packageItem?.numOfConnectors}
              </span>{" "}
              كونكتور
            </p>
            <p className="w-1/2">
              مزودة بعدد :{" "}
              <span className="text-green-600 tracking-wide">
                {packageItem?.numOfBNC}
              </span>{" "}
              BNC
            </p>
          </div>
          {/* end */}
          <p>
            تأتي مع :{" "}
            <span className="text-green-600 tracking-wide">
              {packageItem?.comeWith}
            </span>
          </p>
          <div className="flex justify-center grow items-end flex-wrap">
            <p
              style={{ backgroundColor: `${packageItem?.color}` }}
              className="p-2 px-8 rounded-md text-black font-extrabold shadow-md dark:shadow-white"
            >
              كـل هـذا وحصـريـا{" "}
              <span className="underline underline-offset-8">
                ب{packageItem?.price}
              </span>{" "}
              ريــال فــقط
            </p>
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-2 items-center justify-start">
          <Link to={`/packages-deals-form`}>
            <Button
              variant="gradient"
              color="green"
              className="text-lg px-5 py-2"
              onClick={handleOpen}
            >
              اطلب الآن!
            </Button>
          </Link>
          <Button
            variant="text"
            className="text-lg px-4 py-2 dark:text-darkMode-dark50"
            color="blue-gray"
            onClick={handleOpen}
          >
            خروج
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default PackageModal;
