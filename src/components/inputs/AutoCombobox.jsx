import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import DefaultInput from "./DefaultInput";

export default function AutoCombobox({
    options,
    value,
    onChange,
    className = "",
}) {
    const [query, setQuery] = useState("");

    const filteredOption =
        query === ""
            ? options
            : options.filter((option) => {
                  return option.value
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });

    return (
        <div
            className={
                "relative font-[Roboto] text-[16px] text-black [&>*]:" +
                className
            }
        >
            <Combobox
                value={value.src ? value.value : value}
                onChange={onChange}
            >
                <DefaultInput className="flex flex-row z-0">
                    {value.src && (
                        <img src={value.src} className="p-2 mr-2 size-10" />
                    )}
                    <Combobox.Input
                        className={className}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button>
                        <ChevronDownIcon
                            className="size-4 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </DefaultInput>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                >
                    <Combobox.Options className="absolute mt-1 w-[100%] z-10 bg-default">
                        {filteredOption.length === 0 ? (
                            <div className="text-[14px] pl-2">
                                Nothing found
                            </div>
                        ) : (
                            filteredOption.map((option) => (
                                <Combobox.Option
                                    key={option.value}
                                    value={option.src ? option : option.value}
                                >
                                    {({ active, selected }) => (
                                        <li
                                            className={`${
                                                active
                                                    ? "bg-step_done text-white pl-2"
                                                    : "pl-2 bg-gray-50 text-black"
                                            }`}
                                        >
                                            <div className="flex flex-row items-center">
                                                {option.src && (
                                                    <div>
                                                        <img
                                                            src={option.src}
                                                            className="p-2 mr-2"
                                                        />
                                                    </div>
                                                )}
                                                <div>{option.value}</div>
                                            </div>
                                        </li>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </Combobox>
        </div>
    );
}
