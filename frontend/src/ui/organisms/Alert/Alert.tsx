"use client";

import React, { forwardRef, ReactElement, ReactNode } from "react";
import classNames from "classnames";
import { Stack } from "@ui/layouts/Stack/Stack";
import { Button, ButtonVariantTypes } from "@ui/atoms/Button/Button";
import { Text } from "@ui/atoms/Text/Text";
import { Illustration } from "@ui/atoms/Illustration/Illustration";
import { Overlay } from "@ui/atoms/Overlay/Overlay";

type ObserverEvent = { data: any; name: "CREATE" | "UPDATE" };

//State
class Observer {
  subscriber: CallableFunction[] = [];
  alertdata: AlertOptions[] = [];

  constructor() {
    this.subscriber = [];
    this.alertdata = [];
  }

  subscribe = (sub: CallableFunction) => {
    this.subscriber.push(sub);
  };

  unsubscribe = (subscriber: any) => {
    this.subscriber = this.subscriber.filter((item) => item !== subscriber);
  };

  notify = (event: ObserverEvent) => {
    if (event.name === "CREATE") {
      const modifyData = {
        ...event.data,
        id: Date.now(),
      };
      this.alertdata = [...this.alertdata, modifyData];
      this.subscriber.forEach((sub: CallableFunction) => sub({ data: modifyData, name: event.name }));
    } else {
      this.subscriber.forEach((sub: CallableFunction) => sub({ data: null, name: event.name }));
    }
  };

  delete = (id: number) => {
    this.alertdata = this.alertdata.filter((item) => item.id !== id);
    this.notify({ data: null, name: "UPDATE" });
  };
}

const observer = new Observer();

interface AlertRootProps {}

const AlertContext = React.createContext({
  dismiss: (id: number) => {},
  update: () => {},
});

export function Root(props: AlertRootProps) {
  const { ...rest } = props;
  const store = observer.alertdata;
  const [alertOptions, setAlertOptions] = React.useState<AlertOptions[]>(store);

  function dismiss(id: number) {
    if (id) observer.delete(id);
  }

  React.useEffect(() => {
    const subscription = (event: ObserverEvent) => {
      if (event.name === "CREATE" || event.name == "UPDATE") {
        const arr = [...observer.alertdata];
        setAlertOptions(arr);
      }
    };
    observer.subscribe(subscription);

    return () => {
      observer.unsubscribe(subscription);
    };
  }, []);

  return (
    <AlertContext.Provider
      value={{
        update: () => {},
        dismiss,
      }}>
      <ul {...rest}>
        {alertOptions &&
          alertOptions.map((item, index) => {
            return (
              <AlertElement
                key={item.id}
                alertContent={item.content}
                action={item?.action}
                index={index}
                id={item.id?.toString()}
                actionStyle={item.actionStyle}
                actionsText={item.actionsText}
              />
            );
          })}
      </ul>
    </AlertContext.Provider>
  );
}

interface AlertOptions {
  content: string | React.ReactElement;
  action?:  (close: CallableFunction, e: MouseEvent) => void | ReactElement | Promise<any>;
  id?: number;
  actionStyle?: ButtonVariantTypes;
  actionsText?: {
    cancel?: string
    confirm?: string
  }
}

interface AlertElementProps extends React.ComponentProps<"li"> {
  alertContent: string | React.ReactElement;
  action?: (close: CallableFunction, e: MouseEvent) => void | ReactElement | Promise<any>;
  index: number;
  actionStyle?: ButtonVariantTypes;
  id?: string;
  actionsText?: {
    cancel: string
    confirm: string
  }
}

const AlertElement = (props: AlertElementProps) => {
  const { alertContent, action, actionStyle = "primary", index, actionsText = {cancel: "Annuler", confirm: "Confirmer"}, id, ...rest } = props;
  const { dismiss } = React.useContext(AlertContext);
  const identifier = parseInt(id ? id : "");
  const [ActionButton, setActionButton] = React.useState(
    <Button label={actionsText.confirm} type={"button"} variant={actionStyle} onClick={() => dismiss(identifier)} />,
  );

  /*React.useEffect(() => {
    const intervalId = window.setTimeout(() => dismiss(identifier), 8000 + index * 1000);

    return () => {
      window.clearTimeout(intervalId);
    };
  }, []);*/

  React.useEffect(() => {
    function close() {
      dismiss(identifier);
    }

    if (React.isValidElement(action)) {
      setActionButton(action);
    } else {
      setActionButton(
        React.cloneElement(ActionButton, {
          onClick: (e: MouseEvent) => {
            if (action) action(close, e);
          },
        }),
      );
    }
  }, []);

  return (
    <li className={"absolute left-0 top-0 bottom-0 right-0 flex items-center justify-center"} {...rest}>
      <Overlay className={"z-10"} onClick={() => dismiss(identifier)} />
      <div className={"w-full max-w-96 rounded-2xl shadow-2xl bg-white z-20"}>
        {/*ALERT BODY*/}
        <div className={"p-6 text-gray-800"}>{alertContent}</div>

        {/*ALERT FOOTER*/}
        <div className={"flex items-center justify-end space-x-2 p-4 border-solid border-gray-200 border-t-[1px]"}>
          <Button label={actionsText.cancel} type={"button"} variant={"secondary"} onClick={() => dismiss(identifier)} />
          {ActionButton}
        </div>
      </div>
    </li>
  );
};

export function open(options: AlertOptions) {
  const data = Object.assign(
    {
      content: "Alert content",
    },
    options,
  );

  observer.notify({ name: "CREATE", data: data });
}

export function Example() {
  const onclickHandler = () => {
    open({
      content: (
        <Stack direction={"row"}>
          <Illustration name={"Trash"} />
          <Text>The operation you are trying to make is not reversible!</Text>
        </Stack>
      ),
      action: (close: any) => {
        //...
        close();
      },
    });
  };

  return (
    <Stack direction={"row"}>
      <Button label={"Revoke access"} onClick={onclickHandler} />
    </Stack>
  );
}

Root.displayName = "AlertRoot";
