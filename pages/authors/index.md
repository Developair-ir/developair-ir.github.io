---
layout: page
permalink: /authors/
---

{% for author in {{site.authors}} %}
 - <a href="{{site.baseUrl}}/{{author[1].page}}">{{author[1].display_name}}</a><br/>
{% endfor %}
