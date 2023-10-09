import Link from '@components/ui/link';
import { FaChevronDown } from 'react-icons/fa';
import ListMenu from '@components/ui/list-menu';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';

interface MenuProps {
  data: any;
  className?: string;
  row: boolean;
}

const HeaderMenu: React.FC<MenuProps> = ({ data, className, row }) => {
  const { t } = useTranslation('menu');
  return (
    <nav
      className={cn(
        'headerMenu flex w-full relative -mx-3 xl:-mx-4',
        className
      )}
    >
      {data?.map((item: any) => (
        <div
          className="relative py-3 mx-3 cursor-pointer menuItem group xl:mx-4"
          key={item.id}
        >
          <Link
            href={item.path}
            className="relative inline-flex items-center py-2 text-sm font-normal lg:text-15px text-brand-light group-hover:text-brand before:absolute before:w-0 before:ltr:right-0 rtl:left-0 before:bg-brand before:h-[3px] before:transition-all before:duration-300 before:-bottom-[14px] group-hover:before:w-full ltr:group-hover:before:left-0 rtl:group-hover:before:right-0 lrt:group-hover:before:right-auto rtl:group-hover:before:left-auto"
          >
            {t(item.label)}
            {(item?.columns || item.subMenu) && (
              <span className="text-xs mt-1 xl:mt-0.5 w-4 flex justify-end text-brand-light opacity-80 group-hover:text-brand">
                <FaChevronDown className="transition duration-300 ease-in-out transform group-hover:-rotate-180" />
              </span>
            )}
          </Link>

          {item?.subMenu && Array.isArray(item?.subMenu) && (
            <div
              className={`absolute z-30 opacity-0 subMenu shadow-dropDown transition-all duration-300 invisible bg-brand-light ltr:left-0 rtl:right-0   ${
                item.row ? 'w-[630px] xl:w-[700px]' : 'w-[220px] xl:w-[240px]'
              }  group-hover:opacity-100`}
            >
              <ul
                className={`py-5 text-sm text-brand-muted ${
                  item.row ? 'flex flex-wrap col-span-12' : ''
                } `}
              >
                {item.subMenu.map((menu: any, index: number) => {
                  const dept: number = 1;
                  const menuName: string = `sidebar-menu-${dept}-${index}`;
                  return (
                    <ListMenu
                      dept={dept}
                      data={menu}
                      hasSubMenu={menu.subMenu}
                      menuName={menuName}
                      key={menuName}
                      menuIndex={index}
                      row={item.row ? true : false}
                    />
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default HeaderMenu;
