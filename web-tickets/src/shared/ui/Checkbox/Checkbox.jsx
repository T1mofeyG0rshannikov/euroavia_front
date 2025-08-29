import cls from './Checkbox.module.scss'
import {classNames} from "@/shared/lib/classNames/classNames";

export const Checkbox = ({ children,error, ...other }) => {
	return (
		<div className={classNames(cls.checkbox, [], {
			[cls.error]: error,
		})}>
			<label>
				<input
					type='checkbox'
					{...other}
				/>
				{children}
			</label>
		</div>
	)
}
