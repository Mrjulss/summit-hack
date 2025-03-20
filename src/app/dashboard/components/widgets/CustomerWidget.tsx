import { CustomerType } from "../../types/customerTypes";
import { WidgetFrame } from "../WidgetFrame";
import { WidgetTitle } from "../WidgetTitle";
import {
    FiUser,
    FiCalendar,
    FiGlobe,
    FiBriefcase,
    FiDollarSign,
    FiActivity
} from "react-icons/fi";
import ReactCountryFlag from "react-country-flag"

export function CustomerWidget(customer: CustomerType) {
    return (
        <WidgetFrame>
            <div className="flex items-center gap-3">
                <FiUser className="w-5 h-5 text-[#DE3919]" />
                <WidgetTitle>
                    {customer.name}
                </WidgetTitle>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Age */}
                <div className="flex items-center gap-3 text-[#002C5F]">
                    <FiCalendar className="w-5 h-5" />
                    <span className="font-medium">Age:</span>
                    <span>{customer.age}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3 text-[#002C5F]">
                    <FiGlobe className="w-5 h-5" />
                    <span className="font-medium">Location:</span>
                    <ReactCountryFlag sizes="2xl" countryCode={customer.location} svg />
                </div>

                {/* Profession */}
                <div className="flex items-center gap-3 text-[#002C5F]">
                    <FiBriefcase className="w-5 h-5" />
                    <span className="font-medium">Profession:</span>
                    <span className="truncate">{customer.profession}</span>
                </div>

                {/* Source of Wealth */}
                <div className="flex items-center gap-3 text-[#002C5F]">
                    <FiDollarSign className="w-5 h-5" />
                    <span className="font-medium">Wealth Source:</span>
                    <span className="truncate">{customer.source_of_wealth}</span>
                </div>

                {/* Risk Aversity Meter */}
                <div className="col-span-full mt-4">
                    <div className="flex items-center gap-3 text-[#002C5F]">
                        <FiActivity className="w-5 h-5" />
                        <span className="font-medium">Risk Aversity:</span>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-full ${i < customer.risk_aversity
                                            ? "bg-[#DE3919]"
                                            : "bg-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </WidgetFrame>
    );
}