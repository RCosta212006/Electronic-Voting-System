from datetime import datetime, timezone


def to_utc_datetime(value: datetime | str) -> datetime:
    if isinstance(value, str):
        value = value.replace("Z", "+00:00")
        try:
            parsed = datetime.fromisoformat(value)
        except ValueError:
            return datetime.now(timezone.utc)
    else:
        parsed = value

    if parsed.tzinfo is None:
        return parsed.replace(tzinfo=timezone.utc)

    return parsed.astimezone(timezone.utc)
