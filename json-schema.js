var schema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
        "user": {
            "type": "object",
            "properties": {
                "imageSrc": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "location": {
                    "type": "string",
                    "description": "Region / Country"
                },
                "role": {
                    "type": "string",
                    "description": "Working as ___ at"
                },
                "company": {
                    "type": "string",
                    "description": "CompanyName, Country"
                }
            },
            "required": [
                "imageSrc",
                "name",
                "location",
                "role",
                "company"
            ]
        },
        "socialLinks": {
            "type": "object",
            "properties": {
                "instagram": {
                    "type": "object",
                    "properties": {
                        "url": {
                            "type": "string",
                            "minLength": 1,
                            "pattern": "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?",
                        },
                        "css": {
                            "type": "string",
                            "default": "fa-instagram",
                        }
                    },
                    "required": [
                        "url",
                    ]
                },
                "twitter": {
                    "type": "object",
                    "properties": {
                        "url": {
                            "type": "string",
                            "minLength": 1,
                            "pattern": "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?",
                        },
                        "css": {
                            "type": "string",
                            "default": "fa-twitter",
                        }
                    },
                    "required": [
                        "url",
                    ]
                },
                "linkedin": {
                    "type": "object",
                    "properties": {
                        "url": {
                            "type": "string",
                            "minLength": 1,
                            "pattern": "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?",
                        },
                        "css": {
                            "type": "string",
                            "default": "fa-linkedin",
                        }
                    },
                    "required": [
                        "url",
                    ]
                },
                "email": {
                    "type": "object",
                    "properties": {
                        "url": {
                            "type": "string",
                            "minLength": 1,
                            "pattern": "^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$",
                        },
                        "css": {
                            "type": "string",
                            "default": "fa-envelope-open",
                        }
                    },
                    "required": [
                        "url",
                    ]
                }
            },
            "required": [
                "instagram",
                "twitter",
                "linkedin",
                "email"
            ]
        },
        "otherLinks": {
            "type": "object",
            "maxProperties": 2,
            "additionalProperties": true
        }
    },
    "required": [
        "user",
        "socialLinks"
    ]
}