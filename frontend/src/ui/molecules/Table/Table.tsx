"use client"

import React from "react";
import classNames from "classnames";


interface TableProps extends React.ComponentProps<"table"> {}

export function Table(props: TableProps) {
  const { children, className, ...rest } = props;
  const cn = classNames("w-full border-collapse overflow-hidden", className);

  return (
    <div
      className={
        "min-w-[30rem] rounded-xl shadow-sm border-solid border-[1px] border-gray-200 text-sm text-gray-700 overflow-hidden"
      }>
      <table className={cn} {...rest}>
        {children}
      </table>
    </div>
  );
}

interface TableHeaderProps extends React.ComponentProps<"thead"> {}

export const TableHeader = (props: TableHeaderProps) => {
  const { children, className, ...rest } = props;
  return (
    <thead className={classNames("w-full py-2", className)} {...rest}>
      {children}
    </thead>
  );
};

interface TableThProps extends React.ComponentProps<"th"> {}

export const TableHead = (props: TableThProps) => {
  const { children, className, ...rest } = props;
  return (
    <th className={classNames("w-full flex font-normal", className)} {...rest}>
      {children}
    </th>
  );
};

interface TableRowProps extends React.ComponentProps<"tr"> {}

export const TableRow = (props: TableRowProps) => {
  const { children, className, ...rest } = props;
  return (
    <tr
      className={classNames(
        "group w-full flex py-3.5 border-solid border-b-[1px] border-gray-200 px-6 last:border-b-0 hover:bg-gray-100",
        className,
      )}
      {...rest}>
      {children}
    </tr>
  );
};

interface TableBodyProps extends React.ComponentProps<"tbody"> {}

export const TableBody = (props: TableBodyProps) => {
  const { children, className, ...rest } = props;
  return (
    <tbody className={classNames("border-solid border-t-[1px] border-gray-200", className)} {...rest}>
      {children}
    </tbody>
  );
};

interface TableCellProps extends React.ComponentProps<"td"> {}

export const TableCell = (props: TableCellProps) => {
  const { children, className, ...rest } = props;
  return (
    <td
      className={classNames("group-hover:text-gray-800 w-full text-xs text-gray-600 flex flex-col", className)}
      {...rest}>
      {children}
    </td>
  );
};

interface TableFooterProps extends React.ComponentProps<"tfoot"> {}

export const TableFooter = (props: TableFooterProps) => {
  const { children, className, ...rest } = props;
  return (
    <tfoot className={classNames("", className)} {...rest}>
      {children}
    </tfoot>
  );
};