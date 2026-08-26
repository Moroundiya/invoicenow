"use client";

import { invoiceTemplates } from "@/app/assets/data/invoiceTemplates";

import TemplateCard from "./TemplateCard";
import { TemplateSelectorProps } from "../../types/invoice";

export default function TemplateSelector({
	selectedTemplate,
	onTemplateChange,
}: TemplateSelectorProps) {
	return (
		<section>
			<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
				{invoiceTemplates.map((template) => (
					<TemplateCard
						key={template.id}
						id={template.id}
						name={template.name}
						description={template.description}
						selected={selectedTemplate === template.id}
						onSelect={onTemplateChange}
					/>
				))}
			</div>
		</section>
	);
}
