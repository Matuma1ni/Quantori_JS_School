import { FC } from "react";
import "./TagForm.css";
import { TAGS_CLASSES, Tag } from "../../models/Tag";

interface Props {
    tag: Tag,
    onChange: (tag: Tag) => void,
}
const tags: Tag[] = [Tag.Health, Tag.Work, Tag.Home, Tag.Other];
export const TagForm: FC<Props> = ({ tag, onChange }) => {
    return (<form className="form">
        {tags.map(t => <>
            <input
                type="radio"
                key={t}
                name="tag"
                checked={t === tag}/>
            <label
                className={`tag ${TAGS_CLASSES[t]}`}
                htmlFor={t}
                onClick={() => onChange(t)}>{t}</label>
        </>)}
    </form>)

}