import React from 'react';
import ActiveLink from '@components/ui/active-link';
import useBreadcrumb, { convertBreadcrumbTitle } from '@utils/use-breadcrumb';
import { useTranslation } from 'next-i18next';
import { IoChevronForward } from 'react-icons/io5';
import { IoHomeOutline } from 'react-icons/io5';
import { ROUTES } from '@utils/routes';
import Link from 'next/link';

interface Props {
  children: any;
}

const BreadcrumbItem: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li
      className="text-sm text-brand-muted px-2.5 transition duration-200 ease-in ltr:first:pl-0 rtl:first:pr-0 ltr:last:pr-0 rtl:last:pl-0 hover:text-brand-dark"
      {...props}
    >
      {children}
    </li>
  );
};

const BreadcrumbSeparator: React.FC<Props> = ({ children, ...props }) => {
  return (
    <li className="text-base text-brand-dark mt-[1px]" {...props}>
      {children}
    </li>
  );
};

export const BreadcrumbItems = (props: any) => {
  let children: any = React.Children.toArray(props.children);

  children = children.map((child: string, index: number) => (
    <BreadcrumbItem key={`breadcrumb_item${index}`}>{child}</BreadcrumbItem>
  ));

  const lastIndex = children.length - 1;

  children = children.reduce((acc: any, child: string, index: number) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(
        child,
        <BreadcrumbSeparator key={`breadcrumb_sep${index}`}>
          {props.separator}
        </BreadcrumbSeparator>
      );
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  return (
    <div className="flex items-center borobazarBreadcrumb">
      <ol className="flex items-center w-full overflow-hidden">{children}</ol>
    </div>
  );
};

const Breadcrumb: React.FC<{ separator?: string }> = ({
  separator = (
    <IoChevronForward className="text-brand-dark text-opacity-40 text-15px" />
  ),
}) => {
  const breadcrumbs = useBreadcrumb();
  const { t } = useTranslation('common');
  ROUTES;
  return (
    <BreadcrumbItems separator={separator}>
      <Link href={ROUTES.HOME}>
        <a className="inline-flex items-center font-semibold text-heading">
          <IoHomeOutline className="ltr:mr-1.5 rtl:ml-1.5 text-brand-dark text-15px" />
          {t('breadcrumb-home')}
        </a>
      </Link>

      {breadcrumbs?.map((breadcrumb: any) => (
        <Link href={breadcrumb.href} key={breadcrumb.href}>
          <a className="capitalize font-semibold text-heading">
            {convertBreadcrumbTitle(breadcrumb.breadcrumb)}
          </a>
        </Link>
      ))}
    </BreadcrumbItems>
  );
};

export default Breadcrumb;
