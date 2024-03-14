import React from "react"
import { ArrowLeft, ArrowRight, Select } from "~/shared"
import { add, eachDayOfInterval, endOfMonth, format, getDay, isEqual, isSameMonth, parse } from "date-fns"
import { cn, createOption, getListOfMonths, getListOfYears, MAX_BIRTHDAY_DATE, MIN_BIRTHDAY_DATE } from "~/shared/lib"

type DatePickerProps = {
	value?: Date | string
	onChange: (v: Date) => void
}

// Add the ref type
interface ForwardedDatePickerProps extends DatePickerProps {
	// Include a forwarded ref
	ref: React.ForwardedRef<HTMLDivElement>
}

const MONTH_YEAR_FORMAT = "MMMM-yyyy"

export const DatePicker = React.forwardRef(
	(props: ForwardedDatePickerProps, ref: React.ForwardedRef<HTMLDivElement>) => {
		const { value = MAX_BIRTHDAY_DATE, onChange } = props
		const [selectedDay, setSelectedDay] = React.useState(value)
		const [currentDate, setCurrentDate] = React.useState(format(value, MONTH_YEAR_FORMAT))
		const firstDayCurrentMonth = parse(currentDate, MONTH_YEAR_FORMAT, new Date())

		const [currentMonth, currentYear] = currentDate.split("-")

		// Check if the next and previous months are within the allowed range
		const isNextMonthDisabled = add(firstDayCurrentMonth, { months: 1 }).getFullYear() > MAX_BIRTHDAY_DATE.getFullYear()
		const isPrevMonthDisabled =
			add(firstDayCurrentMonth, { months: -1 }).getFullYear() < MIN_BIRTHDAY_DATE.getFullYear()

		const days = eachDayOfInterval({
			start: firstDayCurrentMonth,
			end: endOfMonth(firstDayCurrentMonth),
		})

		function previousMonth() {
			const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
			setCurrentDate(format(firstDayNextMonth, MONTH_YEAR_FORMAT))
		}

		function nextMonth() {
			const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
			setCurrentDate(format(firstDayNextMonth, MONTH_YEAR_FORMAT))
		}

		function handleSelect(date: Date) {
			setSelectedDay(date)
			onChange && onChange(date)
		}

		return (
			<div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6" ref={ref}>
				<div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
					<div className="md:pr-14 w-full 640:w-428 h-[24rem]">
						<div className="flex items-center gap-2">
							<Select
								options={monthsOptions}
								value={currentMonth}
								onChange={(v) => setCurrentDate(`${v}-${currentYear}`)}
							/>
							<Select
								options={yearsOptions}
								value={currentYear}
								onChange={(v) => setCurrentDate(`${currentMonth}-${v}`)}
							/>
							{/*<h2 className="flex-auto font-semibold text-gray-900">{format(firstDayCurrentMonth, "MMMM yyyy")}</h2>*/}
							<div className={"flex ml-auto"}>
								<button
									type="button"
									onClick={previousMonth}
									className={cn(
										"-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500",
										{
											"opacity-30": isPrevMonthDisabled,
											"pointer-events-none": isPrevMonthDisabled,
										},
									)}
									disabled={isPrevMonthDisabled}
								>
									<span className="sr-only">Previous month</span>
									<ArrowLeft />
								</button>
								<button
									onClick={nextMonth}
									type="button"
									className={cn(
										"-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500",
										{
											"opacity-30": isNextMonthDisabled,
											"pointer-events-none": isNextMonthDisabled,
										},
									)}
									disabled={isNextMonthDisabled}
								>
									<span className="sr-only">Next month</span>
									<ArrowRight />
								</button>
							</div>
						</div>
						<div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
							<div className={"text-red-400"}>S</div>
							<div>M</div>
							<div>T</div>
							<div>W</div>
							<div>T</div>
							<div>F</div>
							<div className={"text-red-400"}>S</div>
						</div>
						<div className="grid grid-cols-7 mt-2 text-sm">
							{days.map((day, dayIdx) => (
								<div key={day.toString()} className={cn(dayIdx === 0 && colStartClasses[getDay(day)], "py-1.5")}>
									<button
										type="button"
										onClick={() => handleSelect(day)}
										className={cn(
											isEqual(day, selectedDay) && "text-white",
											!isEqual(day, selectedDay) && isSameMonth(day, firstDayCurrentMonth) && "text-gray-900",
											!isEqual(day, selectedDay) && !isSameMonth(day, firstDayCurrentMonth) && "text-gray-400",
											isEqual(day, selectedDay) && "bg-gray-900",
											!isEqual(day, selectedDay) && "hover:bg-gray-200",
											isEqual(day, selectedDay) && "font-semibold",
											"mx-auto flex h-8 w-8 items-center justify-center rounded-full",
										)}
									>
										<time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
									</button>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	},
)

const monthsOptions = getListOfMonths().map((v) => createOption(v, v))
const yearsOptions = getListOfYears(MIN_BIRTHDAY_DATE, MAX_BIRTHDAY_DATE).map((v) => createOption(v, v))

const colStartClasses = ["", "col-start-2", "col-start-3", "col-start-4", "col-start-5", "col-start-6", "col-start-7"]
